import express from "express";

import {
  addAttemptedQuestion,
  createUser,
  deleteUser,
  deleteAttemptedQuestion,
  getAllUsers,
  getUser,
  updateUser,
  updateUserPrivilege,
  getAttemptedQuestions,
} from "../controller/user-controller.js";
import { verifyAccessToken, verifyIsAdmin, verifyIsOwnerOrAdmin } from "../middleware/basic-access-control.js";

const router = express.Router();

router.get("/", verifyAccessToken, verifyIsAdmin, getAllUsers);

router.patch("/:id/privilege", verifyAccessToken, verifyIsAdmin, updateUserPrivilege);

router.post("/", createUser);

router.get("/:id", verifyAccessToken, verifyIsOwnerOrAdmin, getUser);

router.patch("/:id", verifyAccessToken, verifyIsOwnerOrAdmin, updateUser);

router.delete("/:id", verifyAccessToken, verifyIsOwnerOrAdmin, deleteUser);

router.get("/:id/attempts", verifyAccessToken, verifyIsOwnerOrAdmin, getAttemptedQuestions);

router.post("/:id/attempts", verifyAccessToken, verifyIsOwnerOrAdmin, addAttemptedQuestion);

router.delete("/:id/attempts/:questionId", verifyAccessToken, verifyIsOwnerOrAdmin, deleteAttemptedQuestion);

export default router;
