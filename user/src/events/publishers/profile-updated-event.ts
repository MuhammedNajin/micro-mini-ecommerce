import { Publisher } from "../../../../common/src/events/base-publisher";
import { Subjects } from "../../../../common/src/events/subject";
import { ProfileUpdatedEvent } from "../../../../common/src/events/user/profile-updated-event";


export class ProfileUpdatedPublisher extends Publisher<ProfileUpdatedEvent> { 

    subject: Subjects.ProfileUpdated = Subjects.ProfileUpdated;
    
}