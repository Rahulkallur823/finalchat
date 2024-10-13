import express from "express";
import { signup, login, logout, allUsers } from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import upload from "../middleware/multer.js"; // Import Multer middleware

const router = express.Router();

// Ensure the field name matches the form submission
router.post("/signup", upload.single("image"), signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);

export default router;
