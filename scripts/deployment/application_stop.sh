#!/bin/bash

set -e

echo "Navigating to the project directory..."
cd /home/ubuntu/FiresideBOT/ || {
    echo "Failed to navigate to /home/ubuntu/FiresideBOT/. Exiting."
    exit 1
}

# Stop all running containers
echo "Checking for running Docker containers..."
running_containers=$(docker ps -q)

if [ -n "$running_containers" ]; then
    echo "Stopping running Docker containers..."
    docker stop $running_containers
else
    echo "No running Docker containers found. Skipping stop step."
fi

# Remove unused containers, images, networks, and volumes
echo "Pruning Docker system resources..."
docker system prune -a -f --volumes

# Remove old dist directories
echo "Removing old dist directories..."
for dist_dir in api/dist discord/dist; do
    if [ -d "$dist_dir" ]; then
        sudo rm -rf "$dist_dir"
        echo "Removed $dist_dir"
    else
        echo "No $dist_dir to remove."
    fi
done

echo "Application stop script completed successfully."