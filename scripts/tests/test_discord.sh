#!/bin/bash

cd "$(dirname "$0")/../.." || exit

docker compose exec discord sh -c "yarn test"