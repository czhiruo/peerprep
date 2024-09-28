import { Router } from "express";
import { questionController } from "../controllers/controllers.js";

const router = Router();

router.get("/", questionController.get); // Get all questions or filter
router.get("/:id", questionController.getById); // Get question by id
router.post("/", questionController.create); // Create a new question
router.put("/:id", questionController.update); // Update a question
router.delete("/:id", questionController.delete); // Delete a question

export default router;
