import { Subjects } from "../subject";


export interface ProductUpdatedEvent {
    subject: Subjects.ProductUpdated;
    data: {
        title: string;
        description: string;
        stock: number;
        price: number;
        image: string;
        id: string;
    }
}