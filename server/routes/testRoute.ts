import express, { Request, Response } from "express";

const testRoute = express.Router();

testRoute.get("/user/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.send({ name: `${id}` });
  res.end();
});

export default testRoute;
