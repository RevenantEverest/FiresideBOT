const config = require('../../../config/config');

//// TODO: Add feature that checks users rank to use this command

module.exports = {
  pollname(message, args, server) {
    if(!args[1]) return message.channel.send("No poll name specified.");

    server.poll = {};
    server.poll.answers = { questions: [], votes: [] };
    server.poll.pollname = message.content.split("?newpoll ").splice(1, 1);
    message.channel.send(`Pollname set to: "${server.poll.pollname}"`);
  },
  pollanswer(message, args, server) {
    if(!args[1]) return message.channel.send("No poll answer specified.");
    if(!server.poll.pollname) return message.channel.send("No poll currently active.");
    if(!server.poll) return message.channel.send("No current poll.");

    server.poll.answers.questions.push(message.content.split("?pollanswer ").splice(1, 1));
    let questionAdded = message.content.split("?pollanswer ").splice(1, 1);
    message.channel.send(`Question ${server.poll.answers.questions.length} set to: ${questionAdded}`);
  },
  sendPoll(message, args, server) {
    if(!server.poll) return message.channel.send("No current poll.");
    if(!server.poll.pollname) return message.channel.send("No poll currently active.");

    let pollEmbed = new config.Discord.RichEmbed();
    pollEmbed
    .setColor(0xffcc00)
    .setThumbnail('https://i.imgur.com/UPcLsZx.png')
    .setTitle(`Poll Question: "${server.poll.pollname}"`)
    .addBlankField()
    for(let i = 0; i < server.poll.answers.questions.length; i++) {
      let counter = 0;
      for(let x = 0; x < server.poll.answers.votes.length; x++) {
        if((server.poll.answers.votes[x] - 1) === i) {
          counter++;
        }
      }
      let votes = `${counter} / ${server.poll.answers.votes.length}`;
      pollEmbed.addField(`${i + 1}. ${server.poll.answers.questions[i]}`, votes, true);
    }
    message.channel.send(pollEmbed);
  },
  vote(message, args, server) {
    if(!args[1]) return message.channel.send("Please specify a numberic value.");
    if(!server.poll.pollname) return message.channel.send("No poll currently active.");

    let voteNum= parseInt(args[1], 10);
    if(isNaN(voteNum)) {
      message.channel.send("Please specifiy a numberic value.");
      return;
    }
    if(server.poll.answers.questions.length < voteNum) {
      message.channel.send("No question with that value.");
      return;
    }
    server.poll.answers.votes.push(voteNum);
    this.sendPoll(message, args, server);
  },
  deletePoll(message, args, server) {
    if(!server.poll.pollname) return message.channel.send("No poll currently active.");

    let pollName = server.poll.pollname;
    server.poll = {};
    message.channel.send(`Poll "${pollName}" has ended.`);
  }
}
