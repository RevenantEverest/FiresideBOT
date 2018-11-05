module.exports = {
  promote(message, args, server) {
    if(!args[1]) return message.channel.send("Please specify a song number to promote.");
    let title = server.queue.titles[parseInt((args[1] - 1), 10)];
    let link = server.queue.links[parseInt((args[1] - 1), 10)];
    let requestedBy = server.queue.requestedBy[parseInt((args[1] - 1), 10)];
    server.queue.titles.splice(parseInt((args[1] - 1), 10), 1);
    server.queue.links.splice(parseInt((args[1] - 1), 10), 1);
    server.queue.requestedBy.splice(parseInt((args[1] - 1), 10), 1);
    server.queue.titles.splice(0, 0, title);
    server.queue.links.splice(0, 0, link);
    server.queue.requestedBy.splice(0, 0, requestedBy);
    message.channel.send(`${title} was promoted to next in queue.`);
  }
}
