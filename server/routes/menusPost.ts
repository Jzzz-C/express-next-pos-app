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
      // console.log(req.query);
      const id = req.query.id;
      const text = `SELECT menus.id, menus.name AS menu_name, url, price, is_available AS available, locations.name AS location_name FROM menus
        INNER JOIN location_menus ON location_menus.menu_id = menus.id
        INNER JOIN locations ON locations.id = location_menus.location_id
        INNER JOIN menus_menu_images ON menus_menu_images.menus_id = menus.id
        INNER JOIN menu_images ON menu_images.id = menus_menu_images.menu_images_id
        WHERE locations.id = $1`;
      const values = [id];
      const menus = (await pool.query(text, values)).rows;
      // console.log(menus);
      res.send({ menus });
    }
  } catch (err) {
    console.log("error", err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const imageUrl = req.body.imageUrl;
    const { name, price, locationIds, menuCatIds, addonCatIds, addonIds } =
      req.body.menu;

    const menuResult = await pool.query(
      "INSERT INTO menus(name, price, image_url) values($1, $2, $3) RETURNING *",
      [name, price, imageUrl]
    );

    const currentMenuId = menuResult.rows[0].id;

    await pool.query(
      "INSERT INTO menus(name, price, image_url) values($1, $2, $3) RETURNING *"
    );
  } catch (err) {
    console.log("error", err);
  }
});
