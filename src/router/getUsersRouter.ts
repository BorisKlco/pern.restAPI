import express from "express";

import { getAllUsers } from "../controllers/users";
import { isAuth } from "../mw";

export default function (router: express.Router) {
  console.log("'/users' Routes loaded...");
  router.get("/users", isAuth, getAllUsers);
}
