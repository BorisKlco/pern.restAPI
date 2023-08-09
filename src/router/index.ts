import express from "express";
import authRouter from "./authRouter";

const router = express.Router();

export default function (): express.Router {
  authRouter(router);
  return router;
}
