import express from "express";
import { pool } from "../db/connect";
import { randomString, random, auth } from "../helpers";

export async function getAllUsers(req: express.Request, res: express.Response) {
  const fetchUsers = await pool.query("SELECT * from users");

  return res.status(200).json(fetchUsers.rows);
}

export async function createUsers(req: express.Request, res: express.Response) {
  const { size } = req.params;
  const usersList = [];
  function Gimmy() {
    return Math.floor(Math.random() * 6) + 4;
  }

  for (let i = 0; i < +size; i++) {
    const salt = random();
    const createRandomUser = {
      username: randomString(Gimmy()),
      email: randomString(Gimmy()) + "@" + randomString(Gimmy()),
      password: auth(salt, randomString(Gimmy())),
      salt: salt,
    };

    const addUsersToDb = await pool.query(
      "INSERT INTO users (email, username, password, salt) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        createRandomUser.email,
        createRandomUser.username,
        createRandomUser.password,
        salt,
      ]
    );

    if (addUsersToDb.rowCount === 0) {
      return res.status(500).send("Something Wo0ong");
    }

    usersList.push(createRandomUser);
  }

  console.log("Random users created", usersList);

  return res.status(200).json(usersList);
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
