import models from "../database/models"
const { Users } = models;
import jwt from "jsonwebtoken"
import  { hashPassword, jwtToken } from "../utils/jwtFuncHelper"
const sgMail = require("@sendgrid/mail");

export default class UserController {
    static async signUp(req, res, next ){
        try {
        const { fullname, email, password } = req.body;
        const emailExist = await Users.findOne({where:{ email }});
        if(emailExist){
            return res.status(409).json({
                success: false,
                message: "Email is already taken"
            });
        }

        const token = jwt.sign({fullname, email, password },process.env.ACCESS_SECRET_TOKEN, {expiresIn: "30m"} )
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
           to: email,
           from: "thierryntira12@gmail.com",
           Subject: "Confirmation Email",
           text: "Hello click on the link below",
           html: `<h2>Hello ${fullname}, you can click on the link below to confirm your account</h2>
                 <p>${process.env.CLIENT_URL}/authentication/confirmation/${token}</p>
           
           `
        }
        sgMail.send(msg)
        .then(()=>{
           return res.json({
               success: true,
               message:"You are almost there!!! We have sent the email to your inbox. Check and confirm to complete the registration."
            })
        })
        .catch((error)=>{
           console.log(error)
        });
 
        } catch (error) {
            return next(new Error(error))
        }
       
    }

    static async activateAccount (req, res, next){
        try {
            const { tokenLink } = req.body;
            const decodedToken = jwtToken.verifyToken(tokenLink);
            const { fullname, email, password } = decodedToken;
            const emailExist = await Users.findOne({where:{ email }});
                if(emailExist){
                    return res.status(409).json({
                        message: "Email already taken"
                    });
                }
        const hashedPassword = hashPassword(password);
        const user = await Users.create({fullname, email, password: hashedPassword});
        const token = jwtToken.createToken(user);
        const {id, username, roleId, provider, isVerified, profilePicture} = user
        return res
        .status(200)
        .json({
            success: true,
            message: "Congraturations, your registration is complete",
            token,
            user: {id, fullname, email, username, roleId, provider, profilePicture, isVerified}
        }) 
                
        } catch (error) {
            return res.status(400)
            .json({
                message: "Invalid or expired token"
            })
        }
        
    }
}



