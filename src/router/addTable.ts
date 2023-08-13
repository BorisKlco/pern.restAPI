import express from "express";

import { addTableToDb } from "../db/createTable";

export default function (router: express.Router) {
  console.log("'add-table-to-db' Routes loaded...");
  router.get("/db/createtable", addTableToDb);
}
