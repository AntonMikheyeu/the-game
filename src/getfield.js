const { size } = require('./settings.json');

module.exports = (arrOfLet = [], cursor = { }, face = {arr: [], headStatus: true}) => {
    const resultField = [];
    let line = [];
    for(let y = 0; y < size.y + 1; y++){
        for(let x = 0; x < size.x + 1; x++){
            let char = arrOfLet.find(let => let.y === y && let.x === x) || ((cursor.y === y && cursor.x === x) ? cursor : undefined);
            line.push(char ? char.mark : ' ');
        };
        for(let i = 0; i < 20; i++){
            if(face.arr[y]) {
                if(face.arr[y][i]){
                    const index = face.headStatus ? i : (20 - i);
                    if(y !== (face.arr.length - 1)) {
                        line.push(face.arr[y][index]);
                    } else {
                        line.push(face.arr[y][i]); 
                    }
                } else {
                    line.push(' ');
                }
            } else{
                line.push(' ');
            }
        }
        resultField.push(line);
        line = [];
    };
    return resultField;
};

