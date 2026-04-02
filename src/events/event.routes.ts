import express from "express";
import { addProgram, deleteProgram } from "./event.controller.js";

const router = express.Router();
router.post("/", addProgram);
router.get("/", (req, res) => {
  res.send("Programs API is working");
});
router.delete("/:id",deleteProgram)
export default router;