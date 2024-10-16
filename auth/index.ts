
import mongoose from 'mongoose';
import { app } from './app';
import cors from 'cors';
import { kafkaWrapper } from './src/kafka-wrapper';

 (async function init() {

   
    await kafkaWrapper.connect('auth-service', ['localhost:9092']);
    await mongoose.connect('mongodb://localhost:27017/mini-auth')
    await kafkaWrapper.createTopic('user-registered', 1, 1);
    app.listen(4000, () => {
        console.log('server running at 4000');
    });
    
})()
