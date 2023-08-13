import express from "express";
import authRouter from "./authRouter";
import getUsersRouter from "./getUsersRouter";
import addTable from "./addTable";
import getLogs from "./getLogs";

const router = express.Router();

export default function (): express.Router {
  authRouter(router);
  getUsersRouter(router);
  getLogs(router);
  addTable(router);
  // better safe than sorry 🤔
  router.get("*", (req, res) => {
    res.redirect("/");
  });
  return router;
}
