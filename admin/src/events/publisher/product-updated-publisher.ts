
import { ProductUpdatedEvent } from "../../../../common/src/events/admin/product-updated-event";
import { Publisher } from "../../../../common/src/events/base-publisher";
import { Subjects } from "../../../../common/src/events/subject";


export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
}