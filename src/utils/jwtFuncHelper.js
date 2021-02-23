import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import DataURI from "datauri/parser";
import path from 'path';
const dataUri = new DataURI();
config();

export const jwtToken = {
     createToken({id, email}){
        const token = jwt.sign({id, email}, process.env.ACCESS_SECRET_TOKEN , {expiresIn: "24h"});
        return token;
        },
        
      verifyToken(token ){
        const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "24h"});
        return decodedToken;
        }
}
export const  base64FileStringGenerator = (req) => dataUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export const hashPassword = (password)=>bcrypt.hashSync(password, 10);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

export const decryptPassword = async (dataTodecrypt, dataBaseHash) => {
    const deHashedPassword = await bcrypt.compare(dataTodecrypt, dataBaseHash);
    return deHashedPassword;
  };