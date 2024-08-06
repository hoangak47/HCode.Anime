const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://hcode-anime.vercel.app"],
    optionsSuccessStatus: 200,
  })
);
dotenv.config();

app.use("/api/home", require("./routers/home.router.js"));
app.use("/api/latest-movie", require("./routers/latest-movie.router.js"));
app.use("/api/detail", require("./routers/detail.router.js"));
app.use("/api/category", require("./routers/category.router.js"));
app.use("/api/search", require("./routers/search.router.js"));
app.use("/api/movie", require("./routers/movie.router.js"));

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
