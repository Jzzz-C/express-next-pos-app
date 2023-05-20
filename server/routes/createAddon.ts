import express, { Request, Response } from "express";
import { pool } from "../db/db";

const router = express.Router();
export default router;

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    res.send("ok");
  } catch (err) {
    console.log("error", err);
  }
});
