import express from "express";
import UserController from "../../controllers/auth.controller";
import validateUser from "../../validations/index";
import loginValidations from "../../validations/login.validations"
const router = express.Router();
const { signUp, activateAccount, signIn } = UserController;

router.post("/user/signUp", validateUser, signUp);
router.post("/user/signUp/emailConfirmation", activateAccount);
router.post("/user/signIn", loginValidations, signIn );
export default router;
