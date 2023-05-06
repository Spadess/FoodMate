import express from "express";
import {createPost, getFeedPosts, getUserPosts, likePost, commentPost, deletePost} from "../controllers/posts.js";
import {verifyToken} from "../middleware/auth.js";
import { uploadPicture} from "../middleware/upload.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts); //read
router.get("/:userId", verifyToken, getUserPosts); //read

router.post("/", verifyToken, uploadPicture.single("picture"), createPost);//post pic

router.patch("/:postId/like", verifyToken, likePost); //update (like) 
router.patch("/:postId/comment", verifyToken, commentPost); //update (comment)

router.delete("/:postId", verifyToken, deletePost); //delete post

export default router;