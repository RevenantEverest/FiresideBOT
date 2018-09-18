const config = require('../../../config/config');
const YTDL = require('ytdl-core');
const youtubeServices = require('../services/youtubeServices');

module.exports = {
  play(channel, message, args, bot) {
    let server;
    switch(channel) {
      case "#revenanteverest":
        server = config.servers['427883469092159490'];
        break;
      case "#skyisdead":
        server = config.servers['138045081553862656'];
        // server = config.servers['469004531410403348'];
        break;
      default:
        break;
    }

    if(!args[1]) return bot.say("Please provide a link");
    // if(server.queue.links.length < 1) bot.say(channel, "No queue open right now.");

    if(args[1].startsWith('http')) {
      server.queue.links.push(args[1]);
    }else {
      let songRequest = '';
      for(let i = 1; i < args.length; i++ ) { songRequest += (args[i] + ' '); }
      youtubeServices.youtubeSearch(songRequest)
        .then(results => {
          server.queue.titles.push(results.data.items[0].snippet.title);
          server.queue.links.push(`https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`);
          bot.say(channel, `${results.data.items[0].snippet.title} was added to the queue.`)
        })
        .catch(err => console.log(err));
    }
  }
};
