import express, { Router } from "express";
import controllers from "../controllers/controllers.js";

const router = Router();

router.get("/", controllers.getAllTasks);
router.post("/", controllers.createTask);
router.put("/:id", controllers.updateTask);
router.delete("/:id", controllers.deleteTask);
router.get("/summary", controllers.getAdvancedStats);

export default router;
