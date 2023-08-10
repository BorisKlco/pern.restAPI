import express from "express";

import { login, register } from "../controllers/auth";

export default function (router: express.Router) {
  console.log("'/auth' Routes loaded...");
  router.post("/auth/login", login);
  router.post("/auth/register", register);
}
