module.exports = {
    async timeParser(sec) {
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor(sec % 3600 / 60);
        let seconds = Math.floor(sec % 3600 % 60);

        let hDisplay = hours > 0 ? `${hours}:` : '';
        let mDisplay = minutes > 0 ? (minutes < 10 ? (hours > 0 ? `0${minutes}:` : `${minutes}:`) : `${minutes}:` ) : '';
        let sDisplay = seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}` ) : '';
        
        return hDisplay + mDisplay + sDisplay;
    },
    async getDate() {
        let date = new Date();
        let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
        return `${date.toLocaleString('en-US', options)} EST`;
    }
};