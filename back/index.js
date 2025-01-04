import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                console.log('Origine bloquée:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

app.use((req, res, next) => {
    console.log('Requête reçue de:', req.headers.origin);
    next();
});

import { router } from './app/routers/router.js';

import { notFound, errorHandler } from './app/middlewares/errorHandler.js';

app.use(express.json());

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.BASE_URL}:${process.env.PORT}`);
});
