const services = {};

services.percent = (num, percent) => {
    return (percent / 100) * num;
};

services.formatOrdinalSuffix = (num) => {
    const modTen = num % 10;
    const modHundred = num % 100;

    if(modTen === 1 && modHundred !== 11)
        return num + "st";
    if(modTen === 2 && modHundred !== 12)
        return num + "nd";
    if(modTen === 3 && modHundred !== 13)
        return num + "rd";

    return num + "th";
};

module.exports = services;