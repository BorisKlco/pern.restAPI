import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import path from "path";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server up on 8080...");
});

app.use("/", router());
