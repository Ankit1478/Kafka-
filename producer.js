const { Kafka } = require("kafkajs");

// Initialize the Kafka instance
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.50.247:9092"],
});

async function init(){
    const producer = kafka.producer()
    console.log("producer connecting...");
    await producer.connect();
    console.log("producer connected");
    await producer.send({
        topic: 'topic-name',
        messages: [{
            partition:0,
            key: 'book-updates',
            value: JSON.stringify({bookName:'chemistry', location:"chemistry book section"}),
            
        }]
    })
    console.log("producer disconnect...")
await producer.disconnect();
}

init();