import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors'
import { getUserProfile } from './src/router/getProfile';

const app = express();
app.use(cors());
app.use(express.json());
app.use(getUserProfile)

app.all('*', (req, res) => {
    console.log(req.url, req.method);
})






export { app };