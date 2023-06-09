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

      const menus = await pool.query(
        `SELECT menus.id, menus.name AS menu_name, price, image_url, locations.name AS location_name FROM MENUS
        INNER JOIN location_menus on location_menus.menu_id = menus.id
        INNER JOIN locations on locations.id = location_menus.location_id
        WHERE locations.id = $1`,
        [id]
      );

      const menusIds = menus.rows.map((menu) => menu.id) as number[];

      const menusMenuCategoriesResult = await pool.query(
        "select * from menus_menu_categories where menus_id = ANY($1::int[])",
        [menusIds]
      );

      const menuCategoryIds = menusMenuCategoriesResult.rows.map(
        (row) => row.category_id
      ) as number[];

      const menuCategoriesResult = await pool.query(
        "select * from menu_categories where  id = ANY($1::int[])",
        [menuCategoryIds]
      );

      const menusAddonCategoriesResult = await pool.query(
        "select * from menus_addon_categories where menus_id = ANY($1::int[])",
        [menusIds]
      );

      const addonCategoryIds = menusAddonCategoriesResult.rows.map(
        (row) => row.addon_cat_id
      ) as number[];

      const addonCategoriesResult = await pool.query(
        "select * from addon_categories where id = ANY($1::int[])",
        [addonCategoryIds]
      );

      const addonAddonCategoriesResult = await pool.query(
        "select * from addon_addon_categories where addon_cat_id = ANY($1::int[])",
        [addonCategoryIds]
      );

      const addonIds = addonAddonCategoriesResult.rows.map(
        (row) => row.addon_id
      ) as number[];

      const addonsResult = await pool.query(
        "select * from addon where id = ANY($1::int[])",
        [addonIds]
      );

      res.send({
        menus: menus.rows,
        menuCategories: menuCategoriesResult.rows,
        addonCategories: addonCategoriesResult.rows,
        addons: addonsResult.rows,
        addonAddonCat: addonAddonCategoriesResult.rows,
        menusAddonCat: menusAddonCategoriesResult.rows,
        menusMenuCat: menusMenuCategoriesResult.rows,
      });
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
