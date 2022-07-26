#!/bin/bash
echo "Stopping Docker Containers..."
cd /home/ubuntu/
cp .env FiresideBOT/
cp .env FiresideBOT/api
cp .env FiresideBOT/discord
cd home/ubuntu/FiresideBOT/scripts
./start_staging.sh