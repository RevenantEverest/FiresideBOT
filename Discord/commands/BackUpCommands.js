module.exports = (PREFIX, message) => {
    if(!message.content.startsWith("fireside")) return;
    let args = message.content.split(" ");
    switch(args[1]) {
        case "prefix":
            return message.channel.send("The prefix for this server is `" + PREFIX + "`");
        default:
            break;
    }
};