import express from "express";

import { getAllUsers, createUsers, deleteUser } from "../controllers/users";
import { isAuth } from "../mw";

export default function (router: express.Router) {
  console.log("'/users' Routes loaded...");
  router.get("/users", isAuth, getAllUsers);
  router.post("/delete", isAuth, deleteUser);
  router.get("/create/:size", isAuth, createUsers);
}
