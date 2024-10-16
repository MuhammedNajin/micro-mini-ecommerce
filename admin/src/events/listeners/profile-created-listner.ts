import { KafkaMessage } from "kafkajs";
import { Listener } from "../../../../common/src/events/base-listener";
import { ProfileCreatedEvent } from "../../../../common/src/events/user/profile-created-event";
import { Subjects } from "../../../../common/src/events/subject";
import { User } from "../../model/user.model";


export class ProfileCreatedListener extends Listener<ProfileCreatedEvent> {
    subject: Subjects.ProfileCreated = Subjects.ProfileCreated;
    queueGroupName: string = ''
   async onMessage(data: ProfileCreatedEvent['data'] , msg: KafkaMessage) {

        const { name, email, userId, image, address, isBlocked } = data;
        
        const user = User.build({
          address,
          email,
          name,
          image,
          userId,
          isBlocked,
        });
    
        await user.save();
      
    }
}