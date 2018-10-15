const config = require('../../../config/config');
const YTDL = require('ytdl-core');
const youtubeServices = require('../services/youtubeServices');
const queueDB = require('../../../models/queueDB');
const autodjDB = require('../../../models/autodjDB');
const usersDB = require('../../../models/usersDB');

function getSongInfo(link) {
  let request = {};
  YTDL.getInfo(link, (err, info) => {
    request.title = info.title;
    request.link = link;
    request.duration = info.length_seconds;
    return request;
  });
}

function youtubeSearch(str) {
  let request = {};
  youtubeServices.youtubeSearch(str)
    .then(results => {
      request.title = results.data.items[0].snippet.title;
      request.link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
      return request;
    })
    .catch(err => console.log(err));
}

module.exports = {
  play(channel, message, args, bot) {
    let server;
    if(!args[1]) return bot.say("Please provide a link or search query");
    usersDB.findByTwitchUsername(channel)
      .then(user => {
        autodjDB.findByUserId(user.user_id)
          .then(settings => {
            if(settings.redirect === 'f') this.twitchQueue(channel, message, args, bot);
            else if(settings.redirect === 't') {
              server = config.servers[settings.guild_id.toString()];
              this.discordQueue(server, channel, message, args, bot);
            }
          })
      })
      .catch(err => console.log(err));

  },
  twitchQueue(channel, message, args, bot) {
    if(args[1].startsWith('http')) {
      return bot.say(channel, "Links are under construction");
    }else {
      let songRequest = '';
      let request = {};
      for(let i = 1; i < args.length; i++ ) { songRequest += (args[i] + ' '); }
      youtubeServices.youtubeSearch(songRequest)
        .then(results => {
          request.link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
          YTDL.getInfo(request.link, (err, info) => {
            request.title = info.title;
            request.duration = info.length_seconds;
            queueDB.save({ channel: channel.split("#")[1], title: request.title, link: request.link, duration: request.duration })
              .then(() => bot.say(channel, `${request.title} has been added to the queue.`))
              .catch(err => console.log(err));
          })
        })
        .catch(err => console.log(err));
    }
  },
  discordQueue(server, channel, message, args, bot) {
    // console.log();
    if(!server || !Object.keys(server))
      return bot.say(channel, "No current Discord Queue");
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
