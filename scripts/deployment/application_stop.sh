#!/bin/bash
echo "Stopping Docker Containers..."
docker stop $(docker container ls -q) && docker system prune -a -f && docker volume prune