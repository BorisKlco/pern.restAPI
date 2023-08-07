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

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error executing query", err);
  } else {
    console.log("Connected to PostgreSQL at:", res.rows[0].now);
  }
});

server.listen(8080, () => {
  console.log("Server running");
});
