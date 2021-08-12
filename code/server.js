const fs = require('fs')
const http = require('http');
const app = require('./app')

const port1 = 3001
const port2 = 3002
const port3 = 3003

const server1 = http.createServer(app);
server1.listen(port1);

const server2 = http.createServer(app);
server2.listen(port2);

const server3 = http.createServer(app);
server3.listen(port3);