import express, { Request, Response } from "express";
import { pool } from "../db/db";

const router = express.Router();
export default router;

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const text = `INSERT INTO locations (name) VALUES($1) RETURNING *`;
    const values = [name];
    const { rows } = await pool.query(text, values);
    res.send(rows);
  } catch (err) {
    console.log("error", err);
  }
});
