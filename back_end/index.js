const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/home", require("./routers/home.router"));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    message: error.message,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
