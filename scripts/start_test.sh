#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker-compose stop

docker-compose -f docker-compose.yml -f override.test.yml build api && docker-compose -f docker-compose.yml -f override.test.yml up api