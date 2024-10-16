import { KafkaMessage } from "kafkajs";
import { Listener } from "../../../../common/src/events/base-listener";
import { ProductDeletedEvent } from "../../../../common/src/events/admin/product-deleted-event";
import { Subjects } from "../../../../common/src/events/subject";
import { Product } from "../../model/product.model";


export class ProductDeletedListener extends Listener<ProductDeletedEvent> {
    subject: Subjects.ProductDeleted = Subjects.ProductDeleted;
    queueGroupName: string = ''
   async onMessage(data: ProductDeletedEvent['data'] , msg: KafkaMessage) {
     console.log('product-deleted-listener');
     
     const { id } = data;

     try {
       const product = await Product.findByIdAndDelete(id);

       console.log("Product deleted");
       
     } catch (error) {
       console.log(error);
     }
      
    }
}