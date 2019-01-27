const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

async function getDate() {
    
}

module.exports = async () => {
    let date = new Date();
    return(`${weekNames[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]} || ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
};