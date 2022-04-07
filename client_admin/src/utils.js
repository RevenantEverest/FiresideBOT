const services = {};

services.timeParser = (sec, format) => {
    let d = Math.floor(sec / (3600 * 24));
    let h = Math.floor(sec % (3600 * 24) / 3600);
    let m = Math.floor(sec % 3600 / 60);
    let s = Math.floor(sec % 3600 % 60);

    let days = d > 0 ? `${d}` : '';
    let hours = h > 0 ? (h < 10 ? (d > 0 ? `${h.toString().padStart(2, '0')}` : `${h}`) : `${h}`) : '';
    let minutes = m > 0 ? (m < 10 ? (h > 0 ? `${m.toString().padStart(2, '0')}` : `${m}`) : `${m}` ) : '';
    let seconds = s > 0 ? (s < 10 ? `${s.toString().padStart(2, '0')}` : `${s}`) : '';

    if(format) 
        return `${d > 0 ? (d > 1 ? `${days} days, ` : `${days} day, `) : ''}` + 
               `${h > 0 ? (h > 1 ? `${hours} hours, ` : `${hours} hour, `) : ''}` +
               `${m > 0 ? (m > 1 ? `${minutes} minutes, ` : `${minutes} minute, `) : ''}` +
               `${s > 0 ? (s > 1 ? `${seconds} seconds` : `${seconds} second`) : ''}`;
    else 
        return `${d > 0 ? `${days}:` : ''}${h > 0 ? `${hours}:` : (d > 0 ? '00' : '')}${m > 0 ? `${minutes}:` : (h > 0 ? '00' : '')}${s > 0 ? `${seconds}` : '00'}`;
};

export default services;