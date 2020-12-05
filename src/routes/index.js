import express from "express";
import dotenv from "dotenv";
import api from "./api/index.js";

dotenv.config();

const router = express.Router();
const apiVersion = process.env.API_VERSION;
const baseUrl = `/api/${apiVersion}`;

router.get("/api", (req, res) => {
  res.status(200).json({ message: "Well Connected api" });
});
router.use(baseUrl, api);
router.use(api);
export default router;
