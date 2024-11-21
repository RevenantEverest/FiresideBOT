#!/bin/bash

cd "$(dirname "$0")/../.." || exit

docker compose stop
docker compose -f docker-compose.yml -f override.test.yml build discord && docker compose -f docker-compose.yml -f override.test.yml --profile discord up --exit-code-from discord