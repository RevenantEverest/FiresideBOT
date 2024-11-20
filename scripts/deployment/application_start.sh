#!/bin/bash

# Exit immediately if a command fails
set -e

echo "Stopping Docker Containers..."
cd /home/ubuntu/

# Ensure .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found in /home/ubuntu/"
    exit 1
fi

# Copy .env to all directories
echo "Copying environment variables..."
for dir in FiresideBOT FiresideBOT/api FiresideBOT/discord; do
    if [ -d "$dir" ]; then
        sudo cp .env "$dir"
    else
        echo "Warning: Directory $dir does not exist. Skipping."
    fi
done

# Navigate to main project directory
cd /home/ubuntu/FiresideBOT/

# Build and start Docker containers
echo "Building and starting Docker containers..."
docker-compose -f docker-compose.yml -f override.staging.yml build api discord
docker-compose -f docker-compose.yml -f override.staging.yml up -d api discord

echo "Deployment completed successfully!"