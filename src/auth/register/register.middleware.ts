import { NextFunction, Request, Response } from "express";
import z from "zod";


const registerSchema = z
  .object({
    name: z.string().trim().min(2),
    displayName: z.string().optional(),
    image: z.string().optional(),

    email: z.email(),
    password: z.string().optional(),

    role: z.enum(["user", "manager", "admin"]).default("user"),
    gender: z.enum(["male", "female", "other"]),

    dateOfBirth: z.coerce.date(),
    dateOfJoining: z.coerce.date(),

    phoneNumber: z.string().trim(),
    secondaryPhoneNumber: z.string().optional(),

    employeeId: z.string(),
    department: z.string(),
    designation: z.string(),
    employeeType: z.enum(["full-time", "part-time", "volunteer"]),

    salaryStructure: z.string(),
    address: z.string(),
    bankDetail: z.string(),
    aadhar: z.string(),
    pan: z.string(),
    resume: z.string(),
  })
  .transform((data) => {
    return {
      ...data,
      displayName: data.displayName ?? data.name,
      secondaryPhoneNumber:
        data.secondaryPhoneNumber ?? data.phoneNumber,
      password:
        data.password ??
        `${data.name.trim().slice(0, 4).toUpperCase()}${data.dateOfBirth.getFullYear()}`,
    };
  });


const updateSchema = z
  .object({
    name: z.string().trim().min(2).optional(),
    displayName: z.string().optional().optional(),
    image: z.string().optional(),

    email: z.email().optional(),
    password: z.string().optional(),

    role: z.enum(["user", "manager", "admin"]).default("user").optional(),
    gender: z.enum(["male", "female", "other"]).optional(),

    dateOfBirth: z.coerce.date().optional(),
    dateOfJoining: z.coerce.date().optional(),

    phoneNumber: z.string().trim().optional(),
    secondaryPhoneNumber: z.string().optional(),

    employeeId: z.string().optional(),
    department: z.string().optional(),
    designation: z.string().optional(),
    employeeType: z.enum(["full-time", "part-time", "volunteer"]).optional(),

    salaryStructure: z.string().optional(),
    address: z.string().optional(),
    bankDetail: z.string().optional(),
    aadhar: z.string().optional(),
    pan: z.string().optional(),
    resume: z.string().optional(),
  })

export type RegisterInputType = z.infer<typeof registerSchema>
export type InputType = z.infer<typeof registerSchema>

export const validateRegisterInput = (req: Request, res: Response, next: NextFunction) => {
  const parsedRegisterInput = registerSchema.safeParse(req.body)

  if (!parsedRegisterInput.success) {
    return res.status(400).json({ success: false, message: "Invalid Input", data: parsedRegisterInput.error.issues[0] })
  }

  req.body = parsedRegisterInput.data
  next()
}

export const validateUpdateInput = (req: Request, res: Response, next: NextFunction) => {
  const parsedUpdateInput = updateSchema.safeParse(req.body)

  if (!parsedUpdateInput.success) {
    return res.status(400).json({ success: false, message: "Invalid Input", data: parsedUpdateInput.error.issues[0] })
  }

  req.body = {
    id: req.body._id || req.body.id,
    data: parsedUpdateInput.data
  }

  next()
}
