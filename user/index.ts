
import mongoose from 'mongoose';
import { app } from './app';
import cors from 'cors';
import { kafkaWrapper } from './src/kafka-wrapper';
import { UserRegisteredListener } from './src/events/listerners/user-registered-listeners';

 (async function init() {

    kafkaWrapper.connect('user-service', ['localhost:9092']);
    new UserRegisteredListener(kafkaWrapper.consumer, kafkaWrapper.groupId as string).listen();
    
    await mongoose.connect('mongodb://localhost:27017/mini-user')

    app.listen(4002, () => {
        console.log('server running at 4002');
    });
    
})()
