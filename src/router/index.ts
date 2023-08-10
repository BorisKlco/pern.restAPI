import express from "express";
import authRouter from "./authRouter";

const router = express.Router();

export default function (): express.Router {
  router.get("/", (req, res) => res.send("Hello"));
  authRouter(router);
  return router;
}
