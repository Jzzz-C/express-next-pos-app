import express, { Request, Response } from "express";
import { fileUpload } from "../src/utils/fileUpload";

const router = express.Router();
export default router;

router.post("/", async (req: Request, res: Response) => {
  try {
    fileUpload(req, res, async (error) => {
      if (error) {
        console.log("error", error);
      }
      console.log(req.files);
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.send({ assetUrl });
    });
  } catch (err) {
    res.sendStatus(500);
  }
});
