import fs from "fs";
import dbConnect from "./connect";

export default async function createTable() {
  const sqlFilePath = "db.sql";
  const sqlCreateTable = fs.readFileSync(sqlFilePath, "utf8");
  const pool = dbConnect();

  async function createTable() {
    try {
      await pool.query(sqlCreateTable);
      console.log("Table created successfully");
    } catch (error) {
      console.error("Error creating table", error);
    }
  }

  console.log("Tables created");

  createTable();
}
