import { Request, Response } from "express";
import { Event } from "../../database/event.model.js";

//Add an event
export const addEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = await Event.create(req.body);
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to add an event" });
  }
};

//Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete an event" });
  }
};
