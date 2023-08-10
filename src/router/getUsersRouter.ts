import express from "express";

import { getAllUsers, deleteYourself, deleteUser } from "../controllers/users";
import { isAuth } from "../mw";

export default function (router: express.Router) {
  console.log("'/users' Routes loaded...");
  router.get("/users", isAuth, getAllUsers);
  router.post("/delete", isAuth, deleteYourself);
  router.post("/delete/:id", isAuth, deleteUser);
}
