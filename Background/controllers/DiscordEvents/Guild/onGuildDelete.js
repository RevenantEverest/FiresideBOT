const guildsController = require('../../guildsController');

module.exports = async (bot, guild) => {
    guildsController.removeGuild(bot, guild)

    /*
    
        Set cron job for certain elements to be deleted after a certain period (14d-30d from removal)

        Currency Records / Settings
        Rank Tiers / Settings / Records
        Server Playlists / Songs
        Custom Commands
        Welcome Messages
        AutoRole
        Trackers
        
        etc
    */
};