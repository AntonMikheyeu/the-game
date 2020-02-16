const show = (arr = [], score) => {
    process.stdout.write(`Score:\t${score}\n`);
    if(arr.length) {
        arr.forEach(line => {
            if(Array.isArray(line) && line.length) {
                process.stdout.write(`${line.join('')}\n`);
            }
        });
    }
};

const clear = () => {
    process.stdout.write('\033c');
};

module.exports = {
    show,
    clear,
};
