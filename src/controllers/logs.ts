import express from "express";
import { pool } from "../db/connect";

export async function getLogs(req: express.Request, res: express.Response) {
  const fetchLogs = await pool.query("SELECT * from logs");

  return res.status(200).json(fetchLogs.rows);
}
