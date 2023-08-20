#!/bin/bash
echo "Stopping Docker Containers..."
cd /home/ubuntu/
sudo cp .env FiresideBOT/
sudo cp .env FiresideBOT/api
sudo cp .env FiresideBOT/discord
sudo cp .env FiresideBOT/trackers
cd /home/ubuntu/FiresideBOT/
docker-compose -f docker-compose.yml -f override.staging.yml build api discord trackers && docker-compose -f docker-compose.yml -f override.staging.yml up -d api discord trackers