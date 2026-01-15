import { Request, Response } from "express";
import { processAndSaveImage } from "./image.service";

export const uploadImageController = async (req: Request, res: Response) => {
  const file = req.file

  if (!file) {
    return res.status(400).json({ message: "No File " })
  }

  const image = await processAndSaveImage(file)

  return res.status(201).json({ message: "Image Upload Succesfully", image })
}
