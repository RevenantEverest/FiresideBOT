module.exports = {
    async getDate() {
        let date = new Date();
        let options = { timezone: 'EST', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
        return `${date.toLocaleString('en-US', options)} EST`;
    }
};