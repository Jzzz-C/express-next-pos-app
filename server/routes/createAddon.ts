import express, { Request, Response } from "express";
import { pool } from "../db/db";

const router = express.Router();
export default router;

router.post("/", async (req: Request, res: Response) => {
  try {
    const { addonCatName, addonName, addonPrice } = req.body;

    const addonCatResult = await pool.query(
      "INSERT INTO addon_categories(category_name) values($1) RETURNING *",
      [addonCatName]
    );

    const currentAddonCatId = addonCatResult.rows[0].id;

    const addonsResult = await pool.query(
      "INSERT INTO addon(addon_name, price) SELECT * FROM UNNEST ($1::text[], $2::int[]) RETURNING *",
      [addonName, addonPrice]
    );

    const currentAddonIdArray = addonsResult.rows.map((addon) => {
      return addon.id;
    });

    await pool.query(
      "INSERT INTO addon_addon_categories(addon_id, addon_cat_id) SELECT * FROM UNNEST ($1::int[], $2::int[]) RETURNING *",
      [
        currentAddonIdArray,
        Array(currentAddonIdArray.length).fill(currentAddonCatId),
      ]
    );

    res.send("ok");
  } catch (err) {
    console.log("error", err);
  }
});
