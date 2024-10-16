// src/kafka-wrapper.ts
import { Kafka, Producer, Admin } from 'kafkajs';

class KafkaWrapper {
   _client?: Kafka;
   _producer?: Producer;
   _admin?: Admin;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access Kafka client before connection");
    }
    return this._client;
  }

  get admin() {
    if (!this._admin) {
      throw new Error("Cannot access Kafka admin before connection");
    }
    return this._admin;
  }

  get producer() {
    if (!this._producer) {
      throw new Error("Cannot access Kafka producer before connection");
    }
    return this._producer;
  }

  async connect(clientId: string, brokers: string[]) {
    this._client = new Kafka({ clientId, brokers });
    this._producer = this._client.producer();
    this._admin = this._client.admin();

    await this._producer.connect();
    await this._admin.connect();
    console.log("Connected to Kafka");
  }

  async createTopic(topicName: string, numPartitions: number, replicationFactor: number) {
    if (!this._admin) {
      throw new Error("Cannot create topic before connecting to Kafka");
    }
    await this._admin.createTopics({
      topics: [{ topic: topicName, numPartitions, replicationFactor }],
    });
    console.log(`Topic ${topicName} created`);
  }

}

export const kafkaWrapper = new KafkaWrapper();
