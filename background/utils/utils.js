const Discord = require('discord.js');
const services = {};

services.calculateLevel = async (complexity, exp) => {
    let constA = (complexity / 1.15);
    let constB = (complexity / -0.25);
    let constC = (complexity * (complexity + 3));
    let Level = Math.max( Math.floor( constA * Math.log(exp + constC ) + constB ), 1);
    return Level;
};
services.arrDifference = async (arr1, arr2) => {
    let arr = [];
    let diff = [];

    for (let i = 0; i < arr1.length; i++) {
        arr[arr1[i]] = true;
    }

    for (let i = 0; i < arr2.length; i++) {
        if (arr[arr2[i]]) delete arr[arr2[i]];
        else arr[arr2[i]] = true;
    }

    for (let k in arr) {
        diff.push(k);
    }

    return diff;
};

module.exports = services;