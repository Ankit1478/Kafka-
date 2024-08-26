const { Kafka } = require("kafkajs");

// Initialize the Kafka instance
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.50.247:9092"],
});

async function init() {
  // Create an admin client from the Kafka instance
  const admin = kafka.admin();
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Admin Connection Success...");

  // Create a topic named "book-updates" with 2 partitions
  console.log("Creating Topic [book-updates]");
  await admin.createTopics({
    topics: [
      {
        topic: "book-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [book-updates]");

  // Disconnect the admin client
  console.log("Disconnecting Admin...");
  await admin.disconnect();
}

// Call the init function to execute the operations
init();