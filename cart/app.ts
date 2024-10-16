import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors'
import { addToCartRouter } from './src/router/addTocart';
import { deleteFromCartRouter } from './src/router/deleteFromcart';
import { getCartRouter } from './src/router/getCart';
import { get } from 'http';

const app = express();
app.use(cors());
app.use(express.json());
app.use(addToCartRouter);
app.use(deleteFromCartRouter);
app.use(getCartRouter);

app.all('*', (req, res) => {
    console.log(req.url, req.method);
})






export { app };