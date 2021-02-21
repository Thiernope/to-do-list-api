import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
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

export const hashPassword = (password)=>bcrypt.hashSync(password, 10);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

export const decryptPassword = async (dataTodecrypt, dataBaseHash) => {
    const deHashedPassword = await bcrypt.compare(dataTodecrypt, dataBaseHash);
    return deHashedPassword;
  };