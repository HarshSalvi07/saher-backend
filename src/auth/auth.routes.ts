import { Router, Request, Response } from "express";
import { registerController } from "./register/register.controller.js";
import { createBankDetailController, deleteBankDetailController, getBankDetailController, updateBankDetailController } from "./bank/bank.controller.js";
import { validateRegisterInput } from "./register/register.middleware.js";
import { validateBankRegisterSchema, validateBankUpdateSchema } from "./bank/bank.middleware.js";
import { validateLoginInput } from "./login/login.middleware.js";
import { loginController } from "./login/login.controller.js";

const authRouter = Router()

authRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "This Is A Auth Page" })
})

// Bank Details Routes
authRouter.post("/bank-detail", validateBankRegisterSchema, createBankDetailController)
  .get("/bank-detail", getBankDetailController)
  .put("/bank-detail", validateBankUpdateSchema, updateBankDetailController)
  .delete("/bank-detail", deleteBankDetailController)

authRouter.post("/register", validateRegisterInput, registerController)

authRouter.post("/login", validateLoginInput, loginController)

export default authRouter
