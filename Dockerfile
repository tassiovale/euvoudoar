FROM node:alpine

# Create app directory
WORKDIR /usr/euvoudoar
COPY package*.json ./

RUN npm install

ADD ./code /usr/euvoudoar/code

EXPOSE 3001 3002 3003

CMD ["node", "code/server.js" ]
