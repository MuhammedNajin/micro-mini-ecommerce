
import { Subjects } from "../subject";

export interface ProfileUpdatedEvent {
    subject: Subjects.ProfileUpdated;
    data: {
        userId: string,
        address: string,
        image: string,

    }
}