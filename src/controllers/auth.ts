import express from "express";
import { random, auth } from "../helpers";
import { UserModelType, UserDataType } from "types";
import { pool } from "../db/connect";

export async function addLog(action: string, user: string) {
  const updateLogs = await pool.query(
    "INSERT INTO logs (useraction, username) VALUES ($1, $2)",
    [action, user]
  );

  if (updateLogs.rowCount) {
    return console.log("Log added", action, user);
  }

  return console.log("Problem adding log");
}

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;

    //Check db for user
    if (!password || !email) {
      return res.status(400).send("Missing data");
    }

    const checkIfUserExist: UserModelType = await pool.query(
      "SELECT * from users WHERE email = $1",
      [email]
    );

    if (checkIfUserExist.rowCount == 0) {
      return res.status(400).send("User doesn't exist");
    }

    //Work with user data
    const user: UserDataType = checkIfUserExist.rows[0];

    const expectedPassword = auth(user.salt, password);

    if (expectedPassword != user.password) {
      return res.status(403).send("Wrong password");
    }

    const tokenSalt = random();
    const createSessionToken = auth(tokenSalt, user.email);

    const updateUserTokenRecord = await pool.query(
      "UPDATE users SET sessiontoken = $1 WHERE email = $2",
      [createSessionToken, user.email]
    );

    if (updateUserTokenRecord.rowCount) {
      addLog("Login", user.username);
      res.cookie("AYAYA", createSessionToken);
      res.cookie("username", user.username);
      return res.status(200).send("Mischief Managed!");
    }

    return res.sendStatus(500);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}

export async function register(req: express.Request, res: express.Response) {
  try {
    const { username, password, email } = req.body;

    //Check db for user
    if (!username || !password || !email) {
      return res.status(400).send("Missing data");
    }

    const checkIfUserExist: UserModelType = await pool.query(
      "SELECT * from users WHERE email = $1",
      [email]
    );

    if (checkIfUserExist.rowCount != 0) {
      return res.status(409).send("Conflict: User exist");
    }

    //Create user
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

    addLog("Register", username);

    return res.status(200).json(addUserToDb.rows[0]);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}
