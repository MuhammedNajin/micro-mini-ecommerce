
// src/events/user-registered-event.ts
import { Subjects } from '../subject';

export interface UserRegisteredEvent {
  subject: Subjects.UserRegistered;
  data: {
    userId: string;
    email: string;
    name: string;
  };
}
