import { KafkaMessage } from "kafkajs";
import { Listener } from "../../../../common/src/events/base-listener";
import { Subjects } from "../../../../common/src/events/subject";
import { User } from "../../model/user.model";
import { ProfileUpdatedEvent } from "../../../../common/src/events/user/profile-updated-event";


export class ProfileUpdatedListener extends Listener<ProfileUpdatedEvent> {
    subject: Subjects.ProfileUpdated = Subjects.ProfileUpdated;
    queueGroupName: string = ''
   async onMessage(data: ProfileUpdatedEvent['data'] , msg: KafkaMessage) {

    const { userId, image, address } = data;

    const user = await User.findById(userId);

    if (user) {
      user.image = image;
      user.address = address;

      await user.save();
    }

    }
}