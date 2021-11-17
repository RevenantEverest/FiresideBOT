const services = {};

services.isFloat = (num) => {
    return Number(num) === num && num % 1 !== 0;
};

export default services;