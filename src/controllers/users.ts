import express from "express";
import dbConnect from "../db/connect";
import { UserModelType } from "types";

export async function getAllUsers(req: express.Request, res: express.Response) {
  const pool = dbConnect();

  const fetchUsers: UserModelType = await pool.query("SELECT * from users");

  return res.status(200).json(fetchUsers.rows);
}
