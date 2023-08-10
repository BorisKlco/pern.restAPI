import express from "express";
import authRouter from "./authRouter";
import getUsersRouter from "./getUsersRouter";

const router = express.Router();

export default function (): express.Router {
  router.get("/", (req, res) => res.send("Hello"));
  authRouter(router);
  getUsersRouter(router);
  return router;
}
