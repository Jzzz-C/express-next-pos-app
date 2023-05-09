import express, { Request, Response } from "express";
import { pool } from "../db/db";

const router = express.Router();
export default router;

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const text = `INSERT INTO addon (addon_name, price) VALUES($1, $2) RETURNING *`;
    const values = [name, price];
    const { rows } = await pool.query(text, values);
    res.send(rows);
  } catch (err) {
    console.log("error", err);
  }
});
