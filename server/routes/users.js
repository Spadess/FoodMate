import express from "express";
import {getUser,getUserFriends,addRemoveFriend, deleteUser, searchUsers} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, searchUsers);//search users
router.get("/:userId", verifyToken, getUser);//get user
router.get("/:userId/friends", verifyToken, getUserFriends);//get user's friendslist

router.patch("/:userId/:friendId", verifyToken, addRemoveFriend);//add or remove a friend

router.delete("/:userId", verifyToken, deleteUser);

export default router;