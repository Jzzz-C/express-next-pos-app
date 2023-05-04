import express, { Request, Response } from "express";
import { pool } from "../db/db";

const router = express.Router();
export default router;

router.get("/", async (req: Request, res: Response) => {
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
