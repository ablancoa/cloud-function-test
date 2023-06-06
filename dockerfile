FROM node:18

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
  chromium \
  libnss3-dev \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
RUN npm ci
COPY . .
CMD [ "npm", "start" ]
