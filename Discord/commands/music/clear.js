module.exports = {
  clear(message, args, server) {
    console.log(server);
    server.queue.titles = [];
    server.queue.links = [];
    message.channel.send("Queue Cleared.");
  }
}
