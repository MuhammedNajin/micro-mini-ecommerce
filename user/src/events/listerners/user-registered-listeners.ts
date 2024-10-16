// src/events/listeners/user-registered-listener.ts
import { KafkaMessage } from 'kafkajs';
import {  UserRegisteredEvent } from '../../../../common/src/events/user/user-registered-event';
import {  Subjects } from '../../../../common/src/events/subject';
import {  Listener } from '../../../../common/src/events/base-listener';
import { User } from '../../models/user.model';
import { ProfileCreatedPublisher } from '../publishers/profile-created-event';
import { kafkaWrapper } from '../../kafka-wrapper';


export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
  subject: Subjects.UserRegistered = Subjects.UserRegistered;
  queueGroupName = 'user-service'; // Replace with your queue group name

  async onMessage(data: UserRegisteredEvent['data'], msg: KafkaMessage) {
    console.log(data);
    const { name, email, userId, } = data;
       console.log(data);
    // Create a new user
    const user = User.build({
      address: 'please add an address',
      email: email,
      name: name,
      image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
      userId,
      isBlocked: false,
    });

    await user.save();

    
    await new ProfileCreatedPublisher(kafkaWrapper.producer).publish({
      address: user.address,
      email: user.email,
      name: user.name,
      image: user.image,
      userId: user.id,
      isBlocked: user.isBlocked,
    });

    console.log('PROFILE: CREATED PUBLISHED');

    // Acknowledge the message
    msg.offset = 'latest'; // Ensure message is committed if needed
  }
}
