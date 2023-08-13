import express from "express";

import { getLogs } from "../controllers/logs";

export default function (router: express.Router) {
  console.log("'/logs' Routes loaded...");
  router.get("/logs", getLogs);
}
