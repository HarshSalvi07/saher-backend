import mongoose from "mongoose";
import { required } from "zod/mini";

const eventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  string: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  manager: {
    type: String,
    required: true,
  },
});

export type eventType = mongoose.InferSchemaType<typeof eventSchema>;
export const Program = mongoose.model("Event", eventSchema);
