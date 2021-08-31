import express from 'express';
import { json } from 'body-parser';

const app = express();

app.use(json());

const router = express.Router();

router.get('/api/account/hello', (req, res, next) => {
    res.status(200).send({
        message: 'hello'
    });
});

app.use(router);

const start = async () => {
    app.listen(
        3000, 
        () => {
            console.log('Servidor rodando na porta 3000')
        }
    );
};

start();