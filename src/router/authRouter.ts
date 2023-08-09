import express from "express";

import { register } from "../controllers/auth";

export default function (router: express.Router) {
  router.get("/", (req, res) => res.send("Hello"));
  router.post("/auth/register", register);
}
