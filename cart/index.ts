
import mongoose from 'mongoose';
import { app } from './app';
import { kafkaWrapper } from './src/kafka-wrapper';
import { ProductCreatedListener } from './src/events/listener/product-created-listener';
import { ProductDeletedListener } from './src/events/listener/product-deleted-listener';
import { ProductUpdatedListener } from './src/events/listener/product-updated-listener';
import { UserRegisteredListener } from './src/events/listener/user-created-listener';

 (async function init() {

    kafkaWrapper.connect('cart-service', ['localhost:9092']);

    new ProductCreatedListener(kafkaWrapper.consumer, 'cart-service-group').listen();
    new ProductDeletedListener(kafkaWrapper.consumer, 'cart-service-group').listen();
    new ProductUpdatedListener(kafkaWrapper.consumer, 'cart-service-group').listen();
    new UserRegisteredListener(kafkaWrapper.consumer, 'cart-service-group').listen();

    await mongoose.connect('mongodb://localhost:27017/mini-cart');

    app.listen(4004, () => {
        console.log('server running at 4003');
    });
    
})()
