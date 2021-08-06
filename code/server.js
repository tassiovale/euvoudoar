const fs = require('fs')
const https = require('https');

const app = require('./app')

//const hostname = 'www.api.euvoudoar.com.br';
const port = 3000

const httpsOptions = {
    cert = fs.readFileSync('./ssl/euvoudoar_com_br.crt'),
    ca = fs.readFileSync('./ssl/euvoudoar_com_br.ca-bundle'),
    key = fs.readFileSync('./ssl/euvoudoar.key')
}

// const port = process.env.port || 3000;
const server = https.createServer(httpsOptions, app);
server.listen(port);