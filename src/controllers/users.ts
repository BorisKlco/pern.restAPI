import express from "express";
import dbConnect from "../db/connect";
const pool = dbConnect();

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
  const { id } = req.params;

  const deleteUserById = await pool.query("DELETE FROM users WHERE id = $1", [
    id,
  ]);

  if (deleteUserById.rowCount != 0) {
    return res.status(200).send(`User by ID ${id} was deleted...`);
  }

  return res.status(404).send("User ID doesnt exist...");
}
