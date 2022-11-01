#!/bin/bash

cd "$(dirname "$0")/.." || exit

sudo rm -rf api/dist
sudo rm -rf discord/dist