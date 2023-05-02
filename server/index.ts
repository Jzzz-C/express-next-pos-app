import express, { Request, Response } from "express";
import cors from "cors";
import testRoute from "./routes/testRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Express server is running on port: 5000");
});

app.get("/user/:id", testRoute);
