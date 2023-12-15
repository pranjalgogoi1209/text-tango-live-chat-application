// messageRoutes.mjs
import { addMessage, getMessages } from "../controllers/messageController.js"; // Update file extension to .mjs
import express from "express";

const router = express.Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);

export default router;
