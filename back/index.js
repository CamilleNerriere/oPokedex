import 'dotenv/config';
import express from 'express';

const app = express(); 

import {router} from './app/routers/router.js';

import { notFound, errorHandler} from './app/middlewares/errorHandler.js';

app.use(express.json());

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.BASE_URL}:${process.env.PORT}`);
});