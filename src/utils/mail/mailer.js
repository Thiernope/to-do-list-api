import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import dotenv from "dotenv";
import style from "./style"
dotenv.config();


class Mailer{

    constructor(mailObject){
        const{to,header,messageHeader,messageBody,Button,optionLink,browserMessage}=mailObject;
        this.to=to;
        this.header=header||'Welcome to ABF';
        this.messageHeader=messageHeader;
        this.messageBody=messageBody;
        this.browserMessage=browserMessage;
        this.Button=Button ;
        this.optionLink=optionLink;

    }
    async sendMail(){
        const html=` <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <style>
              ${style}
            </style>
          </head>
          <body>
          <div class="container">
          <div class="content">
              <div style="padding:30px 30px 29px;margin: 0px auto;">
                <div>
                <div class="image">
                <img src="https://res.cloudinary.com/dev-ltd/image/upload/c_fill,g_center,r_0,w_243/v1614109428/Screen_Shot_2021-02-23_at_21.17.59_yhlo18.png" />

                </div>
                </div>
                <p><span class="welcome">${this.header}</span></p>
                <ul>
                  <li>${this.messageHeader}</li>
                
                  <li class="message">${this.messageBody}</li>
                </ul>
                ${this.Button ? this.buttonTemp : ''}
                <ol>
                <li class="copy"></li>
                <li><a href=""></a></li>
                </ol>
                <div class="regard"><ul>
                  <li><strong>Regards,</strong></li><br>
                  <li>ABF Team</li>
                </ul>
              </div>
              </div>
          </div>
          <br/>
         
        <div align="center" class="social-media">
          <ol>
          <li><a href="#" id="facebook"><img src="https://res.cloudinary.com/fimboo/image/upload/v1611937655/facebook_logo_lhpayw.png"></a></li>
          <li><a href="#" id="twitter"><img src="https://res.cloudinary.com/fimboo/image/upload/v1611937655/twitter_logo_ajduex.png"></a></li>
          <li><a href="#" id="linkedin"><img src="https://res.cloudinary.com/fimboo/image/upload/v1611937655/linkedin_logo_nnjdhn.png"></a></li>
           <li><a href="#" id="google"><img src="https://res.cloudinary.com/fimboo/image/upload/v1611937655/google_logo_givesy.png"></a></li>
          <li><a href="#" id="instagram"><img src="https://res.cloudinary.com/fimboo/image/upload/v1611937652/instagram_logo_wnxqz9.png"></a></li>
          <li><a href="#" id="youtube"><img src="https://res.cloudinary.com/fimboo/image/upload/v1611937652/youtube_logo_cka63r.png"></a></li>
          </ol>
        </div> <br>
        <center>  
            <div align="center" class="footer_text">
          <p>You are receiving this email because it may contain important information to you. <br> If you want to stop getting emails from ABF team, click the link below</p>
          <p><b>Unsubscribe your email</b></p>
        </div>
        </center>
      </div>
          </body>
        </html> `;
        try {

            const transporter = nodemailer.createTransport(
                nodemailerSendgrid({
                  apiKey: process.env.SENDGRID_API_KEY
                })
              );
      
            const messageObj = {
              from: `ABF Application ${process.env.EMAIL_SENDER}`,
              to: this.to,
              subject: this.header,
              html
            };
      
            await transporter.sendMail(messageObj);
            transporter.close();
          } catch (error) {
            throw new Error(error);
          }
        }
      
        /**
         * Sets the email Header
         * @param {String} header - The header of the mail
         * @returns {null} - dosen't return an object
         */
        setHeader(header) {
          this.header = header;
        }
      
        /**
         * Intializes the button
         * @param {string} button.text - The text in the button
         * @param {string} button.link - The url of the mail
         * @returns {null} - dosen't return an object
         */
        InitButton(button) {
          const { text, link } = button;
          this.buttonTemp = `
            <div style="margin: 30px;">
              <a class='link-button' href = '${link}' style="color: white">${text}</a>
            </div>
          `;
        }
      }
      
      export default Mailer;
