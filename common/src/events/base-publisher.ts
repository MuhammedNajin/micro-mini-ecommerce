// src/events/base-publisher.ts
import { Producer } from 'kafkajs';
import { Subjects } from './subject';

export interface Event {
    subject: Subjects;
    data: any;
  }

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  protected producer: Producer;

  constructor(producer: Producer) {
    this.producer = producer;
  }

  async publish(data: T['data']): Promise<void> {
    try {
      await this.producer.send({
        topic: this.subject,
        messages: [{ value: JSON.stringify(data) }],
      });
      console.log('Event published to topic', this.subject);
    } catch (err) {
      console.error('Error publishing event', err);
    }
  }
}
