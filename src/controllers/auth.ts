import express from "express";
import { random, auth } from "../helpers";

export async function register(req: express.Request, res: express.Response) {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.sendStatus(403);
    }
    //if user exist

    const salt = random();
    const user = {
      user: username,
      email: email,
      password: auth(salt, password),
    };

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}
