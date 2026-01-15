import { Request, Response } from "express";
import { processAndSaveImage } from "./image.service.js";
import { Media } from "../../database/media.upload.js";

export const uploadImageController = async (req: Request, res: Response) => {
  const file = req.file
  const name = req.body.name

  if (!file) {
    return res.status(400).json({ message: "No File " })
  }

  const image = await processAndSaveImage(file)

  const dbImage = await Media.create({ src: image?.imageUrl, alt: name })

  return res.status(201).json({ message: "Image Upload Succesfully", dbImage })
}
