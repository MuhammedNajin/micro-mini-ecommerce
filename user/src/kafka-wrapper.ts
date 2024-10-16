// src/kafka-wrapper.ts
import { Kafka, Producer, Consumer } from 'kafkajs';

class KafkaWrapper {
   _client?: Kafka;
   _producer?: Producer;
   _consumer?: Consumer;
   _groupId?: string

  get client() {
    if (!this._client) {
      throw new Error("Cannot access Kafka client before connection");
    }
    return this._client;
  }

  get groupId() {
    return this._groupId
  }

  get producer() {
    if (!this._producer) {
      throw new Error("Cannot access Kafka producer before connection");
    }
    return this._producer;
  }
  get consumer() {
    if (!this._consumer) {
      throw new Error("Cannot access Kafka consumer before connection");
    }
    return this._consumer;
  }

  async connect(clientId: string, brokers: string[]) {
    this._client = new Kafka({ clientId, brokers });
    this._producer = this._client.producer();
    this._groupId = 'user-service-group';
    this._consumer = this.client.consumer({ groupId: "user-service-group"})
    await this._producer.connect();
    console.log("Connected to Kafka");
  }
}

export const kafkaWrapper = new KafkaWrapper();
