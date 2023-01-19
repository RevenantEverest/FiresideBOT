#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker-compose stop
sudo rm -rf postgres_testing_data
docker-compose -f docker-compose.yml -f override.test.yml --profile api build api && docker-compose -f docker-compose.yml -f override.test.yml --profile api up --exit-code-from api