module.exports = {
  clear(message, args, server) {
    server.queue.queueInfo = [];
    message.channel.send("Queue Cleared.");
  }
}
