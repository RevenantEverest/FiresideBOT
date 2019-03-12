module.exports = async (sec) => {
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor(sec % 3600 / 60);
    let seconds = Math.floor(sec % 3600 % 60);

    let hDisplay = hours > 0 ? `${hours}:` : '';
    let mDisplay = minutes > 0 ? (minutes < 10 ? (hours > 0 ? `0${minutes}:` : `${minutes}:`) : `${minutes}:` ) : '';
    let sDisplay = seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}` ) : '';
    
    return hDisplay + mDisplay + sDisplay;
};