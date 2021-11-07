const YTDL = require('ytdl-core');
const Discord_Bot = require('../Discord_Bot');
const youtubeServices = require('../services/youtubeServices');
const errorHandler = require('../controllers/errorHandler');
const services = {};

async function handleYTDLErrors(message, err) {
    if(err.toString().split(":")[0] === "TypeError") {
        console.log("[YTDL TypeError]: ", err.toString());
        return message.channel.send("Invalid search request");
    }

    switch(err.toString()) {
        case "TypeError: Cannot read property 'status' of undefined":
            return message.channel.send("**YouTube** might be down, please check https://downdetector.com/status/youtube/ for more info");
        case "Error: This video is unavailable.":
            return message.channel.send("This video is unavailable");
        case "Error: Video unavailable":
            return message.channel.send("Video is unavailable");
        case "MinigetError: Status code: 429":
            return errorHandler(Discord_Bot, message, err, "YTDL 429 Error", "Utils");
        default:
            return errorHandler(Discord_Bot, message, err, "YTDL Error", "Utils");
    };
};

async function youtubeErrorHandler(err, message) {
    if(err.response) {
        switch(err.response.status) {
            case 403:
                errorHandler(Discord_Bot, message, err, "YouTube Search Error 403: Forbidden", "Utils");
                break;
            default:
                errorHandler(Discord_Bot, message, err, "YouTube Search Error", "Utils");
                break;
        };
    }
    else errorHandler(Discord_Bot, message, err, "YouTube Search Error", "Utils");
};

services.YTDL_GetInfo = async (message, args, server, link, callback) => {
    let info = null;
    
    try {
        info = await YTDL.getBasicInfo(link);
    }
    catch(err) {
        handleYTDLErrors(message, err);
    }

    if(!info) 
        return errorHandler(Discord_Bot, message, "Info is Null", "YTDL Error", "Utils")
    if(info.player_response.videoDetails === undefined) 
        return message.channel.send(`Invalid Video Details`);

    info = info.player_response.videoDetails;
    let thumbnails = info.thumbnail.thumbnails;
    let songInfo = { 
        title: info.title, 
        link: link, 
        author: info.author, 
        duration: info.lengthSeconds, 
        thumbnail: thumbnails[thumbnails.length - 1].url, 
        requestedBy: message.author.username
    };

    if(callback) 
        return callback(songInfo);
    else 
        return songInfo;
};

services.youtubeSearch = async (message, args, server, songRequest, options, callback) => {
    let link = options.isLink ? `https://www.youtube.com/watch?v=${songRequest}` : '';
    if(options.isLink) return services.YTDL_GetInfo(message, args, server, link, callback);
    
    youtubeServices.youtubeSearch(songRequest)
    .then(results => {
        if(results.data.items.length < 1) return message.channel.send("No results found");
        link = `https://www.youtube.com/watch?v=${results.data.items[0].id.videoId}`;
        services.YTDL_GetInfo(message, args, server, link, callback);
    })
    .catch(err => youtubeErrorHandler(err, message));
};

services.youtubePlaylistSearch = async (message, args, server, userstate, playlistID, callback, initialCallback) => {
    let sendInitialCallback = true;
    let ytdlGetInfo = services.YTDL_GetInfo;
    let playlistInfo = [];
    let data = {
        playlist_id: playlistID,
        maxResults: userstate.premium ? 50 : 10
    };

    requestPlaylistItems();

    async function requestPlaylistItems() {
        youtubeServices.youtubePlaylistSearch(data)
        .then(playlist => parseData(playlist))
        .catch(err => youtubeErrorHandler(err, message));
    };

    async function parseData(playlist) {
        console.log("Parsing data...");
        if(playlist.data.items.length < 1) return message.channel.send("No results found");
        if(playlist.data.nextPageToken) data.pageToken = playlist.data.nextPageToken;
        else data.pageToken = null; 
        
        if(sendInitialCallback) 
            message.channel.send(
                "Adding playlist to queue. \n" +
                "This may take a minute or two depending on playlist length." + 
                "Enjoy the first song in the meantime!"
            );

        let playlistItems = playlist.data.items;
        for(let i = 0; i < playlistItems.length; i++) {
            let link = `https://www.youtube.com/watch?v=${playlistItems[i].snippet.resourceId.videoId}`;
            let songInfo = await ytdlGetInfo(message, args, server, link);
            if(songInfo !== undefined) {
                if(i === 1 && sendInitialCallback) {
                    initialCallback(songInfo);
                    sendInitialCallback = false;
                }
                else playlistInfo.push(songInfo);
            }
        }

        if(data.pageToken) 
            requestPlaylistItems();
        else 
            return callback(playlistInfo);
    };
};

module.exports = services;