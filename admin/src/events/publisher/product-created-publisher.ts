import { ProductCreatedEvent } from "../../../../common/src/events/admin/product-created-event";
import { Publisher } from "../../../../common/src/events/base-publisher";
import { Subjects } from "../../../../common/src/events/subject";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
}