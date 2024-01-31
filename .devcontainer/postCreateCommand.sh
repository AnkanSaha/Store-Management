#!/bin/bash

sudo apt-get update -y # Update apt-get cache
sudo apt-get install -y neofetch # Install curl

# Install Dependencies
cd client/ && npm install --force && npm run build && cd .. # Install Client & build dependencies
cd server/ && npm install --force && npm run build && cd ..  # Install Server & build dependencies

# Setup Docker Containers
docker-compose up -d # Start Docker Containers in detached mode mention  in docker-compose.yml