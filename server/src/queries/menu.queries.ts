import { pool } from "../../db/db";
import { CreateMenuParams, Menu } from "../typings/types";

interface Queries {
  createMenu: (createMenuParams: CreateMenuParams) => Promise<Menu>;
}

export const menuQueries: Queries = {
  createMenu: async (createMenuParams: CreateMenuParams) => {
    const { name, price } = createMenuParams;
    const text = `INSERT INTO menus_order(name, price) VALUES($1, $2) RETURNING *`;
    const values = [name, price];
    const { rows } = await pool.query(text, values);
    return rows[0] as Menu;
  },
};
