import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../db/db";

const router = express.Router();
export default router;

router.post("/", async (req: Request, res: Response) => {
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

  // const { name, email, password } = req.body;
  // const isValid =
  //   name &&
  //   name.length > 0 &&
  //   email &&
  //   email.length > 0 &&
  //   password &&
  //   password.length > 0;
  // if (!isValid) return res.send({ error: "Name and password are required." });
  // const result = await pool.query(
  //   "select * from users where email=$1 and password=$2",
  //   [email, password]
  // );
  // if (result.rows.length) res.send({ message: "User already exists." });
  // const companiesResult = await pool.query(
  //   "insert into companies (name) values($1) returning *",
  //   ["Default companies"]
  // );
  // const companyId = companiesResult.rows[0].id;
  // const hashedPassword = await bcrypt.hash(password, 10);
  // const newUser = await pool.query(
  //   "insert into users (name, email, password, companies_id) values($1, $2, $3, $4) RETURNING *",
  //   [name, email, hashedPassword, companyId]
  // );
  // const locationResult = await pool.query(
  //   "insert into locations (name, address, companies_id) values($1, $2, $3) returning *",
  //   ["Default location", "Default addresss", companyId]
  // );
  // const locationId = locationResult.rows[0].id;
  // const menusResult = await pool.query(
  //   "insert into menus (name, price) select * from unnest ($1::text[], $2::int[]) returning *",
  //   [
  //     ["mote-hinn-kharr", "shan-khout-swell"],
  //     [500, 1000],
  //   ]
  // );
  // const menus = menusResult.rows;
  // const defaultMenuId1 = menus[0].id;
  // const defaultMenuId2 = menus[1].id;
  // await pool.query(
  //   "insert into menus_locations (menus_id, locations_id) select * from unnest ($1::int[], $2::int[])",
  //   [
  //     [defaultMenuId1, defaultMenuId2],
  //     [locationId, locationId],
  //   ]
  // );
  // const menuCategoriesResult = await pool.query(
  //   "insert into menu_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
  // );
  // const defaultMenuCategories = menuCategoriesResult.rows;
  // const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
  // const defaultMenuCategoryId2 = defaultMenuCategories[1].id;
  // await pool.query(
  //   `insert into menus_menu_categories (menus_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
  // );
  // const defaultAddonCategoriesResult = await pool.query(
  //   "insert into addon_categories (name) values ('Drinks'), ('Sizes') returning *"
  // );
  // const defaultAddonCategoryId1 = defaultAddonCategoriesResult.rows[0].id;
  // const defaultAddonCategoryId2 = defaultAddonCategoriesResult.rows[1].id;
  // await pool.query(
  //   `insert into menus_addon_categories (menus_id, addon_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
  // );
  // await pool.query(`insert into addons (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}),
  // ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);
  // res.send(newUser.rows);
});
