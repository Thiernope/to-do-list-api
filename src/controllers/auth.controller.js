import models from "../database/models"
import jwt from "jsonwebtoken"
import  { hashPassword, jwtToken,  decryptPassword } from "../utils/jwtFuncHelper"
//import sendingEmail from "../utils/email.sending"
import Mailer from "../utils/mail/mailer";
const validator = require("validator");
const { Users } = models;
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

        const token = jwt.sign({fullname, email, password },process.env.ACCESS_SECRET_TOKEN_LINK, {expiresIn: "30m"} )
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

    static async activateAccount (req, res){
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

    static async signIn(req, res, next){
        try {
            const { email, password } = req.body;
      const user = await Users.findOne({where: {email}});
      if (!user) {
        return res.status(400).json({ error: "Email not found" });
      }
      const decodePassword = await decryptPassword(password, user.password);
      if (!decodePassword) {
        return res.status(400).json({
          Error: "Wrong Password",
        });
      }
      const token = jwtToken.createToken(user);
      return res.status(200).json({
        message: "User logged in successfully",
        token,
      });
        } catch (error) {
            return next( new Error(error))
        }
            }


            static async sendResetLink(req, res, next){
            try {
                const { email } = req.body;
                if(!email){
                    return res.status(400)
                    .json({
                        message: "Email is required"
                    })
                }
                const user = await Users.findOne({where: {email}})
                if(!user) {
               return res.status(400)
               .json({
                   message: "Email not found in our users'database"
               })
                }

                if(!validator.isEmail(email)){
                 return res.status(400)
                 .json({
                     message: "Invalid email account"
                 })
                }
           const token = jwtToken.createToken(user);

        const mail = new Mailer({
            to: `${user.fullname} <${user.email}>`,
            header: 'Reset your password',
            messageHeader: `Hi, <strong>${user.fullname} !</strong>`,
            messageBody: 'You are requesting to reset your password, Click the following Button to reset your password.',
            Button:true
          });
          mail.InitButton({
            text: 'Reset password',
            link: `${req.protocol}://localhost:5000/api/v1/user/reset_password/${token}`
          });
          await mail.sendMail();
           return res.status(200)
             .json({
                 message: "Reset link was sent to your inbox. Please complete the process from your inbox"
             })
            } catch (error) {
                return next( new Error(error))
            }

            }


            static async resetPassword(req, res, next){
                try {
                    const { password, confirmPassword} = req.body;
                    if(!(password&&confirmPassword)){
                        return res.status(200).json({
                            error: "password and confirmPassword fields must be filled"
                        })
                    }
                    if(password !== confirmPassword ) {
                        return res.status(400).json({
                            error: "Not match"
                        })
                    }
                    const { token } = req.params;
                    const decodedToken = jwtToken.verifyToken(token);
                    const hashedPassword = hashPassword(password);
                    const updatedUser = await Users.update(
                        { password: hashedPassword },
                        {
                            where: 
                            { id : decodedToken.id},
                            returning: true, 
                            plain: true
                        })

                        return res.status(200).send({
                            token,
                            user: updatedUser[1],
        
                        })
                } catch (error) {
                    return next(new Error(error))
                }
            }
}



