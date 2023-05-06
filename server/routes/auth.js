import express from "express";
import {login, register} from "../controllers/auth.js";
import { uploadPicture} from "../middleware/upload.js";

const router = express.Router();

router.post("/login", login);
router.post("/register",uploadPicture.single("picture"), register);

export default router;