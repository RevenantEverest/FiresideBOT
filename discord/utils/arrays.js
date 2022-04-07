const services = {};

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

services.shuffle = async (arr) => {
    for(let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
};

services.mode = (arr) => {
    if(arr.length == 0) return null;
    let modeMap = {};
    let maxEl = arr[0], maxCount = 1;
    for(let i = 0; i < arr.length; i++) {
        let el = arr[i];

        if(modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;  

        if(modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
};

module.exports = services;