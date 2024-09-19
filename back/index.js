import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 

const app = express(); 

app.use(
    cors({
           origin: [
        'http://localhost',
        'http://127.0.0.1',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ], 
    })
);

import {router} from './app/routers/router.js';

import { notFound, errorHandler} from './app/middlewares/errorHandler.js';

app.use(express.json());

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.BASE_URL}:${process.env.PORT}`);
});