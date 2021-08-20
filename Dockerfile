FROM node:alpine

# Create app directory
WORKDIR /usr/euvoudoar
COPY package*.json ./

RUN npm install

COPY code ./code

EXPOSE 3001 3002 3003

CMD ["node", "code/server.js" ]
