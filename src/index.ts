import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { Pool } from "pg";

const PG_URL =
  "postgres://ybrvvoyv:WuC-Ag-7q3GnEAwCBkrTCO3ztjfc8ovS@dumbo.db.elephantsql.com/ybrvvoyv";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: PG_URL,
});

const server = http.createServer(app);

pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error", err));

server.listen(8080, () => {
  console.log("Server running");
});
