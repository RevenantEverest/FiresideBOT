const services = {};

services.wrapCanvasText = (str, context, x, y, maxWidth, lineHeight) => {
    const words = str.split(" ");
    let line = "";

    for(let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;

        if(testWidth > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = words[i] + " ";
            y += lineHeight;
        }
        else
            line = testLine;
    }

    context.fillText(line, x, y);
};

module.exports = services;