const fs = requiere('fs')
const https = require('https');

const app = require('./app')

//const hostname = 'www.api.euvoudoar.com.br';
const port = 3000

const httpsOptions = {
    cert = fs.readFileSync('/etc/nginx/ssl/api_euvoudoar_com_br_chain.crt'),
    ca = fs.readFileSync('/etc/nginx/ssl/api_euvoudoar_com_br.ca-bundle'),
    key = fs.readFileSync('/etc/nginx/ssl/api_euvoudoar.key')
}

// const port = process.env.port || 3000;
const server = https.createServer(httpsOptions, app);
server.listen(port);