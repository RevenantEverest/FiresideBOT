module.exports = {
  promote(message, args, server) {
    if(!args[1]) return message.channel.send("Please specify a song number to promote.");
    let queueInfo = server.queue.queueInfo[parseInt((args[1] - 1), 10)]
    args[1] = parseInt((args[1] - 1), 10);
    server.queue.queueInfo.splice(args[1], 1);
    server.queue.queueInfo.splice(0, 0, queueInfo);
    message.channel.send(`${queueInfo.title} was promoted to next in queue.`);
  }
}
