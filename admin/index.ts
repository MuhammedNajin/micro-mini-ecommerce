
import mongoose from 'mongoose';
import { app } from './app';
import { kafkaWrapper } from './src/kafka-wrapper';
import { ProfileCreatedListener } from './src/events/listeners/profile-created-listner';
import { ProfileUpdatedListener } from './src/events/listeners/profile-updated-listner';


 (async function init() {

    kafkaWrapper.connect('admin-service', ['localhost:9092']);
    new ProfileCreatedListener(kafkaWrapper.consumer, 'admin-service-group').listen();
    new ProfileUpdatedListener(kafkaWrapper.consumer, 'admin-service-group').listen()
    await mongoose.connect('mongodb://localhost:27017/mini-admin');

    app.listen(4003, () => {
        console.log('server running at 4003');
    });
    
})()
