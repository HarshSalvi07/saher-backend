import { Request, Response } from "express";
import { BankDetail } from "../../database/bankDetail.model.js";

// Create Bank Controller
export const createBankDetailController = async (req: Request, res: Response) => {

  const { accountHolderName, bankName, ifcs, branch, mobileNumber } = req.body

  try {
    const details = await BankDetail.create({ accountHolderName, bankName, ifcs, branch, mobileNumber })
    return res.status(201).json({ success: true, message: "Bank Details Added Succesfull", data: details })
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Registration failed", data: error });
  }
}

// Get Bank Controller
export const getBankDetailController = async (req: Request, res: Response) => {

  const id = req.body._id || req.body.id

  try {
    const details = await BankDetail.findById(id)

    if (!details) {
      return res.status(200).json({ success: false, message: "Bank Details Not Exist", data: null })
    }

    return res.status(200).json({ success: true, message: "Bank Details Retrive Succesfully", data: details })
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Getting Data failed", data: error });
  }
}

// Update Bank Controller
export const updateBankDetailController = async (req: Request, res: Response) => {

  const { id, data } = req.body

  try {
    const updated = await BankDetail.findByIdAndUpdate(id, data)

    if (!updated) {
      return res.status(200).json({ success: false, message: "Bank Details Not Exist", data: null })
    }

    return res.status(200).json({ success: true, message: "Bank Details Updated Successffully", data: updated })
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Update failed", data: error });
  }
}

// Delete Bank Controller
export const deleteBankDetailController = async (req: Request, res: Response) => {

  const id = req.body._id || req.body.id

  try {
    const deleted = await BankDetail.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(200).json({ success: false, message: "Bank Details Not Exist", data: null })
    }

    return res.status(200).json({ success: true, message: "Bank Details Deleted Succesfully", data: deleted })
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Deletion  failed", data: error });
  }
};
