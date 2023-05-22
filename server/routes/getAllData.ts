import express, { Request, Response } from "express";
import { pool } from "../db/db";

const router = express.Router();
export default router;

router.get("/", async (req: Request, res: Response) => {
  try {
    if (req.method === "GET") {
      const menuCategories = (await pool.query("select * from menu_categories"))
        .rows;
      const addons = (await pool.query("select * from addon")).rows;
      const addonCategories = (
        await pool.query("select * from addon_categories")
      ).rows;
      const locations = (await pool.query("select * from locations")).rows;
      const addonAddonCat = (
        await pool.query("select * from addon_addon_categories")
      ).rows;
      const menusMenuCat = (
        await pool.query("select * from menus_menu_categories")
      ).rows;
      const menusAddonCat = (
        await pool.query("select * from menus_addon_categories")
      ).rows;

      res.send({
        addonAddonCat,
        menusMenuCat,
        menusAddonCat,
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
