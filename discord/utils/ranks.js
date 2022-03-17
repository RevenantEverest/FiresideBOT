const services = {};

services.calculateLevel = async (complexity, exp) => {
    let constA = (complexity / 1.15);
    let constB = (complexity / -0.25);
    let constC = (complexity * (complexity + 3));
    let Level = Math.max( Math.floor( constA * Math.log(exp + constC ) + constB ), 1);
    return Level;
};

module.exports = services;