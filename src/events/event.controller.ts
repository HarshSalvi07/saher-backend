import { Request, Response } from "express";
import { Program } from "./event.model.js";

let programs: Program[] = [];

export const addProgram = (req:Request, res:Response) => {
    const newProgram: Program = req.body;
    programs.push(newProgram);
    res.json(newProgram);
}

export const deleteProgram = (req:Request, res:Response) => {
    const id = req.params.id;
    programs = programs.filter(p => p.id !== id);
    res.json({message: "Event has been deleted successfully"});
}
export { Program };
