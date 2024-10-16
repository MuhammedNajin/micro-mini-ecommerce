import { Subjects } from "../subject";


export interface UserBlockedEvent {
    subject: Subjects.UserBlocked;
    data: {
        userId: string,
        isBlocked: boolean,
    }
}