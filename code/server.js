const fs = require('fs')
const http = require('http');

const app = require('./app')

// const hostname = 'www.api.euvoudoar.com.br';
const port = 3000

// const httpsOptions = {
//     cert: fs.readFileSync('/etc/nginx/ssl/api_euvoudoar_com_br.crt'),
//     ca: fs.readFileSync('/etc/nginx/ssl/api_euvoudoar_com_br.ca-bundle'),
//     key: fs.readFileSync('/etc/nginx/ssl/api_euvoudoar.key')
// }

// const port = process.env.port || 3000;
const server = http.createServer(app);
server.listen(port);