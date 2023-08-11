import express from "express";
import authRouter from "./authRouter";
import getUsersRouter from "./getUsersRouter";

const router = express.Router();

export default function (): express.Router {
  authRouter(router);
  getUsersRouter(router);
  // better safe than sorry 🤔
  router.get("*", (req, res) => {
    res.redirect("/");
  });
  return router;
}
