import { Subjects } from "../subject";


export interface ProductDeletedEvent {
    subject: Subjects.ProductDeleted;
    data: {
        id: string;
    }
}