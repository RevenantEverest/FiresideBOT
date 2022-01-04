const numbers = require('./numbers');
const services = {};

services.drawCircle = (context, positionX, positionY, canvasHeight, percentSize, options) => {
    const size = numbers.percent(canvasHeight, percentSize);
    context.beginPath();
    context.arc(positionX, positionY, size, 0, 2 * Math.PI);
    context.fillStyle = options.fillStyle ? options.fillStyle : "#A62F03";
    context.fill();

    if(options.stroke) {
        context.lineWidth = options.lineWidth ? options.lineWidth : 5;
        context.strokeStyle = options.strokeStyle ? options.strokeStyle : "#FFFFFF";
        context.stroke();
    }
};

module.exports = services;