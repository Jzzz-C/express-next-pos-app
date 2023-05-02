import express, { Request, Response } from "express";
import testRoute from "./routes/testRoute";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { pool } from "./db/db";
import bcrypt from "bcrypt";
import cors from "cors";
import { checkAuth } from "./src/auth/auth";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

// app.get("/user/:id", testRoute);

app.delete("/deleteMenu", checkAuth, async (req: Request, res: Response) => {
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

app.get("/getAllData", checkAuth, async (req: Request, res: Response) => {
  try {
    if (req.method === "GET") {
      const menus = (
        await pool.query(`SELECT menus.id, menus.name AS menu_name, price, url FROM menus
        INNER JOIN menus_menu_images on menus_menu_images.menu_images_id = menus.id
        INNER JOIN menu_images on menu_images.id = menus_menu_images.menus_id`)
      ).rows;
      const menuCategories = (await pool.query("select * from menu_categories"))
        .rows;
      const addons = (await pool.query("select * from addon")).rows;
      const addonCategories = (
        await pool.query("select * from addon_categories")
      ).rows;
      const locations = (await pool.query("select * from locations")).rows;

      res.send({
        menus,
        menuCategories,
        addons,
        addonCategories,
        locations,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/menusPost", checkAuth, async (req: Request, res: Response) => {
  try {
    if (req.method === "POST") {
      const { name, price } = req.body.menu;
      const text = `INSERT INTO menus_order(name, price) VALUES($1, $2) RETURNING *`;
      const values = [name, price];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    } else if (req.method === "PUT") {
      const { name, price } = req.body.menu;
      const id = req.query.id;
      const text = `UPDATE menus SET name = $1, price = $2 WHERE id = $3 RETURNING *`;
      const values = [name, price, id];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    } else if (req.method === "GET") {
      const id = req.query.id;
      const text = `SELECT menus.id, menus.name AS menu_name, url, price, is_available AS available, locations.name AS location_name FROM menus
        INNER JOIN location_menus ON location_menus.menu_id = menus.id
        INNER JOIN locations ON locations.id = location_menus.location_id
        INNER JOIN menus_menu_images ON menus_menu_images.menus_id = menus.id
        INNER JOIN menu_images ON menu_images.id = menus_menu_images.menu_images_id
        WHERE locations.id = $1`;
      const values = [id];
      const menus = (await pool.query(text, values)).rows;
      res.send({ menus });
    }
  } catch (err) {
    console.log("error", err);
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
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
  const accessToken = jwt.sign(user, secretKey);
  res.send({ accessToken });
});

app.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const isValid =
    name &&
    name.length > 0 &&
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  if (!isValid) return res.send({ error: "Name and password are required." });

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query("select * from users where email=$1", [
    email,
  ]);

  if (result.rows.length) res.send({ message: "User already exists." });

  const newUser = await pool.query(
    "insert into users (name, email, password) values($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );

  res.send(newUser);
});

app.listen(5000, () => {
  console.log("Express server is running on port: 5000");
});
