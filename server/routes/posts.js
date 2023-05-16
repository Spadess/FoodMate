import express from "express";
import {createPost, getFeedPosts, getUserPosts, likePost, commentPost, deletePost} from "../controllers/posts.js";
import {verifyToken} from "../middleware/auth.js";
import { uploadPicture, uploadVideo} from "../middleware/upload.js";
import multer from "multer";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts); //read
router.get("/:userId", verifyToken, getUserPosts); //read

router.post("/", verifyToken, multer().none(), createPost);//post without media
router.post("/pictureUpload", verifyToken, uploadPicture.single("picture"), createPost);//post pic
router.post("/videoUpload", verifyToken, uploadVideo.single("video"), createPost);//post video

router.patch("/:postId/like", verifyToken, likePost); //update (like) 
router.patch("/:postId/comment", verifyToken, commentPost); //update (comment)

router.delete("/:postId", verifyToken, deletePost); //delete post

export default router;