import express from "express";

import { handleLogin, handleVerifyToken } from "../controller/auth-controller.js";
import { requestPasswordReset, resetPassword,} from "../controller/password-controller.js";
import { verifyAccessToken } from "../middleware/basic-access-control.js";

const router = express.Router();

router.post("/login", handleLogin);

router.get("/verify-token", verifyAccessToken, handleVerifyToken);

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

export default router;
