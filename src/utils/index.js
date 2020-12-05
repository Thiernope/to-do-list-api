import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {config} from "dotenv";
config();
export const hashedPassword = (password) => bcryptjs.hashSync(password, 10);
//export const comparePassword = (password, hash) => bcryptjs.compareSync(password, hash);

