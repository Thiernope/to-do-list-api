import express from "express";
import User from "./user.route.js";
const router = express.Router();

router.use("/", User);

export default router;
