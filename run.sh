#!/bin/bash

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null; then
        echo "API Online"
else
        cd /usr/share/nginx/FiresideBOT/API && sudo nohup node server-api.js &
fi

if lsof -Pi :3002 -sTCP:LISTEN -t >/dev/null; then
        echo "Logger Online"
else
        cd Logger && nohup node server-logger.js &
fi

if lsof -Pi :3005 -sTCP:LISTEN -t >/dev/null; then
        echo "Bot Online"
else
        cd Discord && nohup node server-discord.js &
fi

if lsof -Pi :3006 -sTCP:LISTEN -t >/dev/null; then
        echo "DBL Online"
else
        cd DBL && nohup node server-dbl.js &
fi

if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null; then
        echo "Twitch Tracker Online"
else
        cd TwitchTracker && nohup node server-twitchTracker.js &
fi