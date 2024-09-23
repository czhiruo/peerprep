import { Router } from "express";
import { questionController } from "../controllers/controllers.js";

const router = Router();

router.get("/", questionController.getAll);
router.get("/:id", questionController.getById);
router.get("/filter", questionController.getByFilter);
router.post("/", questionController.create);
router.put("/:id", questionController.update);
router.delete("/:id", questionController.delete);

export default router;
