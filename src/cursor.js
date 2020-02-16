const { size } = require('./settings.json');

module.exports = function Cursor() {
    this.x = size.x/2;
    this.y = size.y;
    this.mark = '⮝';
    this.setX = value => {
        this.x = value;
    };
};
