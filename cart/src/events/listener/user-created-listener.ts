import { KafkaMessage } from "kafkajs";
import { Listener } from "../../../../common/src/events/base-listener";
import { UserRegisteredEvent } from "../../../../common/src/events/user/user-registered-event";
import { Subjects } from "../../../../common/src/events/subject";
import { User } from "../../model/user.model";



export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
    subject: Subjects.UserRegistered = Subjects.UserRegistered;
    queueGroupName: string = ''
   async onMessage(data: UserRegisteredEvent['data'] , msg: KafkaMessage) {
     console.log('user-created-listener');
     try {
        const { email, userId } = data;
        const user = User.build({ userId, email });
        await user.save();
      }
      catch (error) {
        console.log(error)
     }
         
    }
}