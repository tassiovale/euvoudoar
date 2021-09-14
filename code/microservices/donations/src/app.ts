import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { createRouter  } from './routes/create';

import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.set('trust proxy', true); // express must be aware it is behind nginx ingress

app.use(json()); 
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUser);

app.use(createRouter);

app.all('*', async () =>  {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };