const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use(cors({
  origin: 'http://localhost:3001'
}));

app.post("/messages", (req, res) => {
  console.log(req.body);
  res.send("done")
});

app.get("/", (req, res) => {
  res.send("Connected to api-1");
});


app.listen(4001, () => {
  console.log(`Server is running on port ${4001}.`);
});
