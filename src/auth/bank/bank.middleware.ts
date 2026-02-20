import { Response, Request, NextFunction } from "express";
import z from "zod";

// Schemas
// Register Schema
const bankRegisterSchema = z.object({
  accountHolderName: z.string(),
  bankName: z.string(),
  ifcs: z.string(),
  branch: z.string(),
  mobileNumber: z.string(),
});

// Update Schema
const bankUpdateSchema = z.object({
  accountHolderName: z.string().optional(),
  bankName: z.string().optional(),
  ifcs: z.string().optional(),
  branch: z.string().optional(),
  mobileNumber: z.string().optional(),
})

// Types
export type bankRegisterType = z.infer<typeof bankRegisterSchema>
export type bankUpdateType = z.infer<typeof bankUpdateSchema>

// Validate Update Bank Register Schema
export const validateBankRegisterSchema = async (req: Request, res: Response, next: NextFunction) => {
  const parsedBankRegisterInput = bankRegisterSchema.safeParse(req.body)

  if (!parsedBankRegisterInput.success) {
    return res.status(400).json({
      success: false,
      message: parsedBankRegisterInput.error.issues[0],
    });
  }

  req.body = parsedBankRegisterInput.data
  next()
}

// Validate Update Bank Update Schema
export const validateBankUpdateSchema = async (req: Request, res: Response, next: NextFunction) => {
  const parsedBankUpdateInput = bankUpdateSchema.safeParse(req.body)

  if (!parsedBankUpdateInput.success) {
    return res.status(400).json({ success: false, message: parsedBankUpdateInput.error.issues[0] })
  }

  req.body = {
    id: req.body._id || req.body.id,
    data: parsedBankUpdateInput.data
  }
  next()
}
