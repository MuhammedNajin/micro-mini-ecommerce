import { Subjects} from '../subject'

export interface ProfileCreatedEvent {
    
    subject: Subjects.ProfileCreated;

    data: {
        userId: string,
        email: string,
        name: string,
        address: string,
        isBlocked: boolean,
        image: string,
    }
}