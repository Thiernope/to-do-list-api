import express from "express";
import UserController from "../../controllers/auth.controller";
import validateUser from "../../validations/index";
const router = express.Router();
const { signUp, activateAccount } = UserController;

router.post("/user/signUp", validateUser, signUp);
router.post("/user/signUp/emailConfirmation", activateAccount);

export default router;
