import express from "express";
import {login, register, logout} from "../controllers/auth.js";
import {verifyToken} from "../middleware/auth.js";
import { uploadPicture} from "../upload/multer.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", uploadPicture.single("picture"), register);
router.get("/logout", verifyToken, logout);

export default router;