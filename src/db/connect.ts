import { Pool } from "pg";

const PG_URL =
  "postgres://ybrvvoyv:WuC-Ag-7q3GnEAwCBkrTCO3ztjfc8ovS@dumbo.db.elephantsql.com/ybrvvoyv";

export const pool = new Pool({
  connectionString: PG_URL,
});

pool
  .connect()
  .then(() => console.log("DB connection successful..."))
  .catch((err) => {
    console.error("DB connection error: ", err);
    process.exit(1);
  });
