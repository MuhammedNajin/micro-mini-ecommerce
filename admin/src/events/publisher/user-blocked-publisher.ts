
import { UserBlockedEvent } from "../../../../common/src/events/admin/user-blocked";
import { Publisher } from "../../../../common/src/events/base-publisher";
import { Subjects } from "../../../../common/src/events/subject";


export class UserBlockedPublisher extends Publisher<UserBlockedEvent> {
  subject: Subjects.UserBlocked = Subjects.UserBlocked;
}