import { KafkaMessage } from "kafkajs";
import { Listener } from "../../../../common/src/events/base-listener";
import { ProductUpdatedEvent } from "../../../../common/src/events/admin/product-updated-event";
import { Subjects } from "../../../../common/src/events/subject";
import { Product } from "../../model/product.model";



export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
    subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
    queueGroupName: string = ''
   async onMessage(data: ProductUpdatedEvent['data'] , msg: KafkaMessage) {
     console.log('product-updated-listener');
     
     console.log(data);
       const { id } = data
      
     try {
 
       const product = await Product.findById(id);
 
       if (product) {
         const product = await Product.findByIdAndUpdate(id, data, {
           new: true,
           runValidators: true,
           useFindAndModify: false,
         });
 
     
       }
     } catch (error) {
       console.log(error);
     }
    }
}