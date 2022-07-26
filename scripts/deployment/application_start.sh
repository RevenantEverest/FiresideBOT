#!/bin/bash
echo "Stopping Docker Containers..."
cd /home/ubuntu/
sudo cp .env FiresideBOT/
sudo cp .env FiresideBOT/api
sudo cp .env FiresideBOT/discord
cd home/ubuntu/FiresideBOT/scripts
sudo ./start_staging.sh