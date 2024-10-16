import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors'
import { addProductRouter } from './src/router/addProduct';
import { getProductRouter } from './src/router/getProduct';
import { updateProductRouter } from './src/router/updateProduct';
import { deleteProductRouter } from './src/router/deleteProduct';
import { getUserRouter } from './src/router/getUsers';
import { BlockUserRouter } from './src/router/block-user';

const app = express();
app.use(cors());
app.use(express.json());

app.use(addProductRouter);
app.use(getProductRouter);
app.use(updateProductRouter);
app.use(deleteProductRouter);
app.use(getUserRouter);
app.use(BlockUserRouter)

app.all('*', (req, res) => {
    console.log(req.url, req.method);
})






export { app };