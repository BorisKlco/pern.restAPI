import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dbConnect from "./db/connect";
import router from "./router";

const pool = dbConnect();

pool
  .connect()
  .then(() => console.log("- Connected to the database"))
  .catch((err) => {
    console.error("DB connection error: ", err);
    process.exit(1);
  });

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on 8080:");
});

app.use("/", router());
