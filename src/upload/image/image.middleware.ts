import multer from "multer"
import { Request } from "express"

const storage = multer.memoryStorage()

const supportedFileMimeType = new Set([
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "image/avif",
])

const fileFilter: multer.Options["fileFilter"] = (req: Request, file, cb) => {
  // To Check The File Type Is Image
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only Image Is Allowed"))
  }

  // To Check The Give Image Type Is Supported
  if (!supportedFileMimeType.has(file.mimetype)) {
    cb(new Error("Image Format Not Supported"))
  }

  // If All The Check Is Done
  cb(null, true)
}

export const uploadImage = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024, }, })
