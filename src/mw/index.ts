import express from "express";
import { pool } from "../db/connect";

export async function isAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const userToken = req.cookies.AYAYA;
    if (!userToken) {
      console.error(new Date(), "MWerror - Missing cookie");
      return res.sendStatus(401);
    }

    const checkForValidToken = await pool.query(
      "SELECT * from users WHERE sessiontoken = $1",
      [userToken]
    );

    if (checkForValidToken.rowCount == 0) {
      console.error(new Date(), "MWerror - Invalid cookie: ", userToken);
      return res.sendStatus(401);
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}
