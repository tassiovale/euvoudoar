const express = require('express');
const app = express();
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('', (req, res, next) => {
    res.status(200).send({
        message: 'Eu vou doar - Docker API',
        date: new Date(),
    });
})

router.get('/health', (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: 'Up',
        date: new Date()
    }

    res.status(200).send(data);
});

app.use('/', router);

module.exports = app;
