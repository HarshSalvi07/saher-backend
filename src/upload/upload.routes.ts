import { Router, Request, Response } from 'express'


const uploadRouter = Router()

uploadRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json("This Is A Upload Route")
})


export default uploadRouter
