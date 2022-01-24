const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const services = {};

services.timeParser = async (sec) => {
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor(sec % 3600 / 60);
    let seconds = Math.floor(sec % 3600 % 60);

    let hDisplay = hours > 0 ? `${hours}:` : '';
    let mDisplay = minutes > 0 ? (minutes < 10 ? (hours > 0 ? `0${minutes}:` : `${minutes}:`) : `${minutes}:` ) : '';
    let sDisplay = seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}` ) : '';
    
    return hDisplay + mDisplay + sDisplay;
};

services.getDate = async () => {
    let date = new Date();
    let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    return `${date.toLocaleString('en-US', options)} EST`;
};

services.sortByDate = async (arr) => {
    return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
};

services.formatDate = (timestamp, dateFormat="ddd MMM Do YYYY", timeFormat="h:mma") => {
    let timestampFormats = ["YYYY-MM-DDTHH:mm:ssZZ"]
    let parsedDate = dayjs(timestamp, timestampFormats).utc();

    let date = dayjs(parsedDate).utc().local().format(dateFormat);
    let time = dayjs(parsedDate).utc().local().format(timeFormat);
    return { date: date, time: time };
};

module.exports = services;