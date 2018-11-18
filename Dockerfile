## Specifies the base image we're extending
FROM node:8.12

## Create base directory
RUN mkdir -p /app/

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /app/

## Install packages using NPM 5 (bundled with the node:9 image)
COPY ["./package.json", "./yarn.lock", "/app/"]
RUN npm install -g --silent yarn
RUN yarn install

RUN npm install -g pm2
RUN npm install -g babel-cli

## Add application code
COPY [".", "/app/"]