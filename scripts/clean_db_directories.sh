#!/bin/bash

cd "$(dirname "$0")/.." || exit

sudo rm -rf pgadmin_data
sudo rm -rf postgres_data
sudo rm -rf postgres_testing_data