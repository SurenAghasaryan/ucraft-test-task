FROM node:14-alpine

WORKDIR /api-2

COPY package.json package-lock.json ./ 

RUN npm install
RUN npm install -g pm2

COPY . .

CMD pm2-runtime start pm2.config.json