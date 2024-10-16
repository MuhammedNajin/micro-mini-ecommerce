// src/events/publishers/user-registered-publisher.ts
import { Publisher } from '../../../../common/src/events/base-publisher';
import {  UserRegisteredEvent } from '../../../../common/src/events/user/user-registered-event';
import {  Subjects } from '../../../../common/src/events/subject';


export class UserRegisteredPublisher extends Publisher<UserRegisteredEvent> {

  subject: Subjects.UserRegistered = Subjects.UserRegistered;
  
}
