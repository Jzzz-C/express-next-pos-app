import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/db";

const router = express.Router();
export default router;

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body.user;
  // input, request, data validation
  const isValid = email && email.length > 0 && password && password.length > 0;
  // if (!isValid) return res.send({ error: "Name and password are required." });
  // const result = await pool.query(
  //   "select * from users where email=$1 and password=$2",
  //   [email, password]
  // );

  if (!isValid) return res.status(400);

  const result = await pool.query("select * from users where email=$1", [
    email,
  ]);

  if (!result.rows.length) return res.status(404);

  const isValidPassword = await bcrypt.compare(
    password,
    result.rows[0].password
  );

  // if (!result.rows.length) throw new Error("Bad request. Invalid credentails.");
  // //  res.cookie("token", "jfasljdkfjdasFADSFKASDFKALSksmkdf");
  // res.send(result.rows);

  if (!isValidPassword) return res.status(401).send("Invalid credentails.");

  const userResult = result.rows[0];
  const user = {
    id: userResult.id,
    name: userResult.name,
    email: userResult.email,
  };

  const secretKey = process.env.JWT_SECRET || "";
  const accessToken = jwt.sign(user, secretKey, {
    expiresIn: 1000 * 60 * 60 * 24, // one day
  });
  res.send({ accessToken });
});
