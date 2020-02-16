const screen = require('./screen');
const Cursor = require('./cursor');
const Let = require('./let');
const getField = require('./getfield');
const { size } = require('./settings.json');
const face = require('./face');
const mode = process.env.MODE || "manual";

const play = () => {
const cursor = new Cursor();
let delay = 500;
let intervalMark = null;
let letPull = [];
let score = 0;

if(mode === "manual") {
    const stdin = process.openStdin();
    stdin.setRawMode(true);
    stdin.addListener("data", key => {
    screen.clear();
    switch (key.toString()) {
        case 'a':
            cursor.setX(cursor.x - 1 < 0 ? cursor.x : cursor.x - 1);
            break;
        case 'd':
            cursor.setX(cursor.x + 1 > size.x ? cursor.x : cursor.x + 1);
            break;    
    };
    const field = getField(letPull, cursor, {arr: face(false), headStatus: false});
    screen.show(field, `${score}\tMode:\t${mode}`);
});
}

const addLets = () => {
    intervalMark = setInterval(() => {
        screen.clear();
        const count = Math.floor(Math.random() * Math.floor(size.x/5));
        letPull.forEach(part => {
            part.setY(part.y + 1);
        });
        letPull = letPull.filter(part => {
            if(part.y === cursor.y && part.x === cursor.x) process.exit();
            return part.y !== cursor.y + 1;
        });
        for(let i = 0; i < count; i++){
            letPull.push(new Let());
        };
        const field = getField(letPull, cursor, {arr:face(), headStatus: true});
        screen.show(field, `${score}\tMode:\t${mode}`);
        score += 1;
    }, delay);
};

const auto = (getStatus, toggleStatus) => {
    const avaliblePos = [];
    const letXs = letPull.filter(let => let.y === cursor.y - 1).map(let => let.x);
    for(let i = 0; i < size.x; i++){
        if(!letXs.includes(i)) avaliblePos.push(i);
    };
    if(letXs.length) {
        const oldX = cursor.x;
        const redf = (diff, item) => {
            const current = item - cursor.x;
            return Math.abs(diff) > Math.abs(current) ? current : diff;
        };
        let diff = 0;
        if(getStatus()) {
            diff = avaliblePos.reduce(redf, size.x);
        } else {
            diff = avaliblePos.reduceRight(redf, size.x);
        }
        toggleStatus();
        if(diff < 0) {
            cursor.setX(cursor.x - 1);
        }
        if(diff > 0) {
            cursor.setX(cursor.x + 1);
        }
        if(oldX !== cursor.x) {
            screen.clear();
            const field = getField(letPull, cursor, {arr: face(false), headStatus: false});
            screen.show(field, `${score}\tMode:\t${mode}`);
        }
    }
};

const autoPlay = () => {
    let status = false;
    const toggleStatus = () => {
        status = !status;
    };
    const getStatus = () => status;
    return auto.bind(null, getStatus, toggleStatus);
};

if(mode === "auto") {
    setInterval(autoPlay(), 30);
}

setInterval(() => {
    clearInterval(intervalMark);
    if(delay > 60) delay -= 5;
    addLets();
}, 1000);
};

play();

