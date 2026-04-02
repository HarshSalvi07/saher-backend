import express from "express";
import programRoutes from "./event.routes.js";

const app = express();
app.use(express.json());

app.use("/programs", programRoutes);

app.listen(5000, () => {
  console.log("Test server running");
});