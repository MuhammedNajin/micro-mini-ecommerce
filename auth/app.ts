import express from 'express';
import { signup} from './src/routers/signup'
import mongoose from 'mongoose';
import cors from 'cors'
import { login } from './src/routers/login';

const app = express();
app.use(cors());
app.use(express.json());
app.use(signup);
app.use(login);
app.all('*', (req, res) => {
    console.log(req.url, req.method);
})






export { app };