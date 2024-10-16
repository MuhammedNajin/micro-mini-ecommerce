import { KafkaMessage } from "kafkajs";
import { Listener } from "../../../../common/src/events/base-listener";
import { ProductCreatedEvent } from "../../../../common/src/events/admin/product-created-event";
import { Subjects } from "../../../../common/src/events/subject";
import { User } from "../../model/user.model";
import { Product } from "../../model/product.model";


export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
    queueGroupName: string = ''
   async onMessage(data: ProductCreatedEvent['data'] , msg: KafkaMessage) {
     console.log('product-created-listener');
     
    const { description, id, image, price, stock, title } = data;

    try {
      const product = Product.build({
        description,
        id,
        image,
        price,
        stock,
        title,
      });

      await product.save();
    } catch(error) {
        console.log(error)
    }
      
    }
}