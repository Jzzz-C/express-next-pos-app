import express, { Request, Response, json } from "express";
import { pool } from "../db/db";
import { menuQueries } from "../src/queries/menu.queries";

const router = express.Router();
export default router;

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     if (req.method === "POST") {
//       const { name, price } = req.body.menu;
//       const result = menuQueries.createMenu({ name, price });
//       console.log(result);
//       res.send("ok");
//     }
//   } catch (err) {
//     console.log("error", err);
//   }
// });

router.put("/", async (req: Request, res: Response) => {
  try {
    if (req.method === "PUT") {
      const { name, price } = req.body.menu;
      const id = req.query.id;
      const text = `UPDATE menus SET name = $1, price = $2 WHERE id = $3 RETURNING *`;
      const values = [name, price, id];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    }
  } catch (err) {
    console.log("error", err);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    if (req.method === "GET") {
      const id = req.query.id;
      const text = `SELECT menus.name AS menu_name, price, image_url, locations.name AS location_name FROM MENUS
        INNER JOIN location_menus on location_menus.menu_id = menus.id
        INNER JOIN locations on locations.id = location_menus.location_id
        WHERE locations.id = $1`;
      const values = [id];
      const menus = (await pool.query(text, values)).rows;
      res.send({ menus });
    }
  } catch (err) {
    console.log("error", err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const imageUrl = req.body.imageUrl;
    const { name, price, locationIds, menuCatIds, addonCatIds } = req.body.menu;

    const menuResult = await pool.query(
      "INSERT INTO menus(name, price, image_url) values($1, $2, $3) RETURNING *",
      [name, price, imageUrl]
    );

    const currentMenuId = menuResult.rows[0].id;

    await pool.query(
      "INSERT INTO location_menus(location_id, menu_id) SELECT * FROM UNNEST ($1::int[], $2::int[]) RETURNING *",
      [locationIds, Array(locationIds.length).fill(currentMenuId)]
    );

    await pool.query(
      "INSERT INTO menus_menu_categories(menus_id, category_id) SELECT * FROM UNNEST ($1::int[], $2::int[]) RETURNING *",
      [Array(menuCatIds.length).fill(currentMenuId), menuCatIds]
    );

    await pool.query(
      "INSERT INTO menus_addon_categories(menus_id, addon_cat_id) SELECT * FROM UNNEST ($1::int[], $2::int[]) RETURNING *",
      [Array(addonCatIds.length).fill(currentMenuId), addonCatIds]
    );

    res.send("ok");
  } catch (err) {
    console.log("error", err);
  }
});
