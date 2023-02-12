const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { Kafka } = require("kafkajs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

const kafka = new Kafka({
  clientId: "api-1",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer({
  retries: 5,
  retry: {
    maxRetryTime: 10000,
    initialRetryTime: 300,
    factor: 2,
  },
});

const sendMessage = async (message) => {
  await producer.connect();
  await producer.send({
    topic: "update-score",
    messages: [{ value: message }],
  });
  await producer.disconnect();
};

app.post("/messages", async (req, res) => {
  const { message } = req.body;

  console.log(message);
  try {
    await sendMessage(message);
    res.status(206).send("done");
  } catch(err) {
    console.log(err)
  }
});

app.get("/", (req, res) => {
  res.send("Connected to api-1");
});

app.listen(4001, () => {
  console.log(`Server is running on port ${4001}.`);
});
