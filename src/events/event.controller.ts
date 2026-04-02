import { Request, Response } from "express";
import { Program } from "./event.model.js";

//Add an event
export const addProgram = async (req: Request, res: Response) => {
  try {
    const newProgram = await Program.create(req.body);
    res.json(newProgram);
  } catch (error) {
    res.status(500).json({ error: "Failed to add an event" });
  }
};

//Delete an event
export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Program.findByIdAndDelete(id);
    res.json({ message: "Event has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete an event" });
  }
};
