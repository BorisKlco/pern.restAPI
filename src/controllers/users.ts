import express from "express";
import { pool } from "../db/connect";

export async function getAllUsers(req: express.Request, res: express.Response) {
  const fetchUsers = await pool.query("SELECT * from users");

  return res.status(200).json(fetchUsers.rows);
}

export async function deleteYourself(
  req: express.Request,
  res: express.Response
) {
  const getUserToken = req.cookies.AYAYA;
  if (!getUserToken) {
    return res.sendStatus(403);
  }

  const deleteMyself = await pool.query(
    "DELETE FROM users WHERE sessiontoken = $1",
    [getUserToken]
  );

  if (deleteMyself.rowCount != 0) {
    return res.status(200).send("User deleted by himself...");
  }

  return res.status(500).send("Internal Error: User wasn't deleted...");
}

export async function deleteUser(req: express.Request, res: express.Response) {
  const { users } = req.body;

  const deleteUsers = await pool.query(
    "DELETE FROM users WHERE id = ANY($1::int[])",
    [users]
  );

  if (deleteUsers.rowCount != 0) {
    console.log("Users:", users, "deleted.");
    return res.status(200).send(`Users was deleted...`);
  }

  return res.status(404).send("Users ID doesnt exist...");
}
