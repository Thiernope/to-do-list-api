import express from "express";
import UserController from "../../controllers/auth.controller";
import validateUser from "../../validations/index";
import loginValidations from "../../validations/login.validations"
import { multerUploads } from "../../middleware/multer";
const router = express.Router();
const { signUp, activateAccount, signIn, sendResetLink, resetPassword, getUserInfo, upDateUser} = UserController;

router.post("/user/signUp", validateUser, signUp);
router.post("/user/signUp/emailConfirmation", activateAccount);
router.post("/user/signIn", loginValidations, signIn );
router.post("/user/forgot_password", sendResetLink );
router.post("/user/reset_password/:token", resetPassword );
router.get("/user/getuser", getUserInfo);
router.put("/user/updateuser", multerUploads, upDateUser);
export default router;
