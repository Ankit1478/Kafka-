const { Kafka } = require("kafkajs");

// Initialize the Kafka instance
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.50.247:9092"],
});

async function init() {
  const consumer = kafka.consumer({ groupId: 'group-1' });
  await consumer.connect();
  await consumer.subscribe({ topics: ['topic-name'], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const parsedMessage = JSON.parse(message.value.toString());

      console.log(
        `Group: [${topic}]: PART:${partition}: bookName: ${parsedMessage.bookName}, location: ${parsedMessage.location}`
      );
    },
  });
}

init();
