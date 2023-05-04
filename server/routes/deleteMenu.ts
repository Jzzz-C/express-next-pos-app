import express, { Request, Response } from "express";
import { pool } from "../db/db";

const router = express.Router();
export default router;

router.delete("/", async (req: Request, res: Response) => {
  try {
    if (req.method === "DELETE") {
      const id = req.query.id;
      const text = `DELETE FROM menus_order WHERE id = ($1) RETURNING *`;
      const values = [id];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    }
  } catch (err) {
    console.log("error", err);
  }
});
