import express from "express";
import fs from "fs";
import { pool } from "./connect";

export async function addTableToDb(
  req: express.Request,
  res: express.Response
) {
  const sqlFilePath = "./src/db/db.sql";
  const sqlCreateTable = fs.readFileSync(sqlFilePath, "utf8");

  async function createTable() {
    try {
      await pool.query(sqlCreateTable);
      console.log("Table created successfully");
    } catch (error) {
      console.error("Error creating table", error);
    }
  }

  createTable();

  return res.status(200).send("Table created");
}
