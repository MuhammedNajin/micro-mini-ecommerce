// src/events/base-listener.ts
import { Consumer, KafkaMessage } from 'kafkajs';

import { Subjects } from './subject';

export interface Event {
    subject: Subjects;
    data: any;
  }

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: KafkaMessage): void;
  
  protected consumer: Consumer;
  protected groupId: string;
  protected topic: string;
  protected ackWait: number;

  constructor(consumer: Consumer, groupId: string, ackWait: number = 10000) {
    this.consumer = consumer;
    this.groupId = groupId;
    this.ackWait = ackWait;
    this.topic = ''
  }

  subscriptionOptions() {
    return {
      groupId: this.groupId,
      allowAutoTopicCreation: false, // Adjust based on your Kafka setup
      sessionTimeout: this.ackWait,
    };
  }

  async listen() {
    this.topic = this.subject;
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const parsedMessage = this.parseMessage(message);
        console.log('mgs', parsedMessage)
        this.onMessage(parsedMessage, message);
      },
    });
  }

  parseMessage(msg: KafkaMessage): any {
    try {
      return JSON.parse(msg.value?.toString('utf-8') || '{}');
    } catch (err) {
      console.error('Error parsing message', err);
      return null;
    }
  }
}
