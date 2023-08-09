import { Pool } from "pg";

export default function dbConnect() {
  const PG_URL =
    "postgres://ybrvvoyv:WuC-Ag-7q3GnEAwCBkrTCO3ztjfc8ovS@dumbo.db.elephantsql.com/ybrvvoyv";

  const pool = new Pool({
    connectionString: PG_URL,
  });

  return pool;
}
