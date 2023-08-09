import express from "express";
import dbConnect from "../db/connect";
import { random, auth } from "../helpers";

export async function register(req: express.Request, res: express.Response) {
  try {
    const { username, password, email } = req.body;
    const pool = dbConnect();

    if (!username || !password || !email) {
      return res.sendStatus(400);
    }
    //if user exist

    const salt = random();
    const user = {
      user: username,
      email: email,
      password: auth(salt, password),
    };

    const addUserToDb = await pool.query(
      "INSERT INTO users (email, username, password, salt) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.email, user.user, user.password, salt]
    );

    return res.status(200).json(addUserToDb.rows[0]);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}
