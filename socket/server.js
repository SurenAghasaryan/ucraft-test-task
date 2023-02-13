const WebSocket = require("ws");
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "ws-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'update-score', fromBeginning: true });

  const server = new WebSocket.Server({
    port: 5000,
  });

  server.on('connection', (socket) => {
    console.log('Client connected');

    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        console.log(`Received message: ${value}`);

        server.clients.forEach((client) => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(value);
          }
        });
      },
    });

    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

run().catch(console.error);