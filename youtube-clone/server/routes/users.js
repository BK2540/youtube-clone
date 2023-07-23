import express from 'express';
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//UPDATE USER
router.put("/:id", verifyToken, update);

//DELETE USER
router.delete("/:id",verifyToken, deleteUser);

//GET USER
router.get("/find/:id", getUser);

//SUBSCRIBE
router.put("/sub/:id",verifyToken, subscribe);

//UNSUBSCRIBE
router.put("/unsub/:id",verifyToken, unsubscribe);

//LIKE
router.put("/like/:videoId",verifyToken, like);

//DISLIKE
router.put("/dislike/:videoId",verifyToken, dislike);


export default router;