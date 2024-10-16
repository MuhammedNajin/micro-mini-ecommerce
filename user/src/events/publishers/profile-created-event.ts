
import { Publisher } from "../../../../common/src/events/base-publisher";
import { Subjects } from "../../../../common/src/events/subject";
import { ProfileCreatedEvent } from "../../../../common/src/events/user/profile-created-event";

export class ProfileCreatedPublisher extends Publisher<ProfileCreatedEvent> {
   subject: Subjects.ProfileCreated = Subjects.ProfileCreated;
}