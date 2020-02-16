const { size } = require('./settings.json');

module.exports = function Let() {
    this.x = Math.floor(Math.random() * (size.x + 1));
    this.y = 0;
    this.mark = '▬';
    this.setY = value => {
        this.y = value;
    };
};
