#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker-compose stop

docker-compose -f docker-compose.yml -f override.dev.yml build api discord guildwars_event_tracker && docker-compose -f docker-compose.yml -f override.dev.yml up api discord guildwars_event_tracker