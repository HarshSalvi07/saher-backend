import { Router, Request, Response } from 'express'
import { uploadImageController } from './image/image.controller.js'
import { uploadImage } from './image/image.middleware.js'

const uploadRouter = Router()

uploadRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json("This Is A Upload Route")
})

uploadRouter.post("/image", uploadImage.single("image"), uploadImageController)


export default uploadRouter
