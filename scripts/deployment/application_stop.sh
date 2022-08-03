#!/bin/bash
echo "Stopping Docker Containers..."

if [ $( docker ps -a | wc -l ) -gt 1 ]; then
  echo docker stop $(docker container ls -q) && docker system prune -a -f
else
  echo "No docker containers running, skipping..."
fi