const config = require('../config/config');
const bot = require('../Discord_Bot');

module.exports = {
    index(req, res, next) {
        let servers = config.servers.map(el => {
            let guild = bot.guilds.resolve(el.id) || null;
            if(!guild) return null;
            else 
                return {
                    name: guild.name,
                    icon: guild.iconURL(),
                    memberCount: guild.memberCount,
                    id: el.id,
                    queue: {
                        isPlaying: el.queue.isPlaying,
                        isPaused: el.queue.isPaused,
                        queueInfo: el.queue.queueInfo,
                        currentSongInfo: el.queue.currentSongInfo,
                        options: {
                            volume: el.queue.options.volume,
                            loop: el.queue.options.loop,
                            recommendations: el.queue.options.recommendations,
                            voteToSkip: el.queue.options.voteToSkip
                        }
                    },
                    premium: el.premium
                }
        }).filter(Boolean);
        
        res.json({ data: servers });
    }
};