import sharp from "sharp";
import path from "path";
import crypto from "crypto"

const uploadPath = path.join(process.cwd(), "public/uploads/images")

export const processAndSaveImage = async (file: Express.Multer.File) => {
  const fileName = `${crypto.randomUUID()}.webp`
  const filePath = path.join(uploadPath, fileName)
  const imageUrl = `${process.env.BASE_URL}/uploads/images/${fileName}`

  const info = await sharp(file.buffer)
    .resize({ width: 1024, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(filePath)

  return {
    fileName,
    imageUrl,
    size: info.size,
    width: info.width,
    height: info.height,
    mimetype: "image/webp"
  }
}
