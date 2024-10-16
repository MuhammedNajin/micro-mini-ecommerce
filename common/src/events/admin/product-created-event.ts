import { Subjects } from "../subject";

export interface ProductCreatedEvent {
      subject: Subjects.ProductCreated;
      data: {
        title: string;
        description: string;
        stock: number;
        price: number;
        image: string;
        id: string;
      }
}