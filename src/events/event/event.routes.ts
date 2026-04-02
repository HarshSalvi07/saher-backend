import express from "express";
import { addEvent, deleteEvent } from "./event.controller.js";

const router = express.Router();
router.post("/", addEvent);
router.get("/", (req, res) => {
  res.send("Programs API is working");
});
router.delete("/:id",deleteEvent)
export default router;