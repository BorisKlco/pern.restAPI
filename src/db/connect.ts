import { Pool } from "pg";

export default function dbConnect() {
  const PG_URL =
    "postgres://ybrvvoyv:WuC-Ag-7q3GnEAwCBkrTCO3ztjfc8ovS@dumbo.db.elephantsql.com/ybrvvoyv";

  const pool = new Pool({
    connectionString: PG_URL,
  });

  pool
    .connect()
    .then(() => console.log("- Connected to the database"))
    .catch((err) => {
      console.error("DB connection error: ", err);
      process.exit(1);
    });

  return pool;
}
