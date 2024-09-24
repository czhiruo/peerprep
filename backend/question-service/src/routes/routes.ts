import { Router } from "express";
import { questionController } from "../controllers/controllers.js";

const router = Router();

router.get("/", questionController.get);
router.post("/", questionController.create);
router.put("/", questionController.update);
router.delete("/", questionController.delete);

export default router;
