import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import { pool } from "./db/db";
import bcrypt from "bcrypt";
import cors from "cors";
import { checkAuth } from "./src/auth/auth";
import deleteMenu from "./routes/deleteMenu";
import getAllData from "./routes/getAllData";
import menusPost from "./routes/menusPost";
import menuCategories from "./routes/menuCategories";
import addonCategories from "./routes/addonCategories";
import addon from "./routes/addon";
import image from "./routes/image";
import login from "./routes/login";
import register from "./routes/register";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/deleteMenu", deleteMenu);

app.use("/getAllData", getAllData);

app.use("/menusPost", menusPost);

app.use("/menuCategories", menuCategories);

app.use("/addonCategories", addonCategories);

app.use("/addon", addon);

app.use("/image", image);

app.use("/login", login);

app.use("/register", register);

app.listen(5000, () => {
  console.log("Express server is running on port: 5000");
});
