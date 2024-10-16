import { ProductDeletedEvent } from "../../../../common/src/events/admin/product-deleted-event";
import { Publisher } from "../../../../common/src/events/base-publisher";
import { Subjects } from "../../../../common/src/events/subject";


export class ProductDeletedPublisher extends Publisher<ProductDeletedEvent> {
  subject: Subjects.ProductDeleted = Subjects.ProductDeleted;
}