const services = {};

services.truncateText = (str, length=100) => {
    if(str.length > length) {
        let charArr = str.split("");
        let temp = "";
        charArr.forEach((el, idx) => idx < length ? temp += el : '');
        str = temp + "...";
    }
    return str;
};

export default services;