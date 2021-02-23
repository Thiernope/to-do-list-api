import { config } from "dotenv";
config();
import sgMail from "@sendgrid/mail"
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendingEmail = (receiver, sender, subject, content) =>{
try {
    const data = {
        to: receiver,
        from: sender,
        subject,
        html: content
    }

    return sgMail.send(data)
} catch (e) {
    return new Error(e)
}
}

export default sendingEmail;