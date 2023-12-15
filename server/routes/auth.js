// userRoutes.mjs
import {
  login,
  register,
  getAllUsers,
  setAvatar,
} from "../controllers/userController.js";

import express from "express";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);

export default router;
