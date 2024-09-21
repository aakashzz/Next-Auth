import { User } from "@/models/user.models";
import nodeMailer from "nodemailer";
import { hash } from "bcryptjs";
interface Properties {
   email: string;
   emailType: String;
   userID: String;
}

export const sendEmail = async ({ email, emailType, userID }: Properties) => {
   try {
      const hashedToken = await hash(userID.toString(), 10);

      if (emailType === "VERIFY") {
         await User.findByIdAndUpdate(userID, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
         });
      } else if (emailType === "RESET") {
         await User.findByIdAndUpdate(userID, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
         });
      }

      // Looking to send emails in production? Check out our Email API/SMTP product!
      var transport = nodeMailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
           user: "4d69dba326e579",
           pass: "5ac142ade66f1b"
         }
       });

      const mailOptions = {
         from: "aakash@aakash.ai",
         to: email,
         subject:
            emailType === "VERIFY" ? "Verify your email" : "Rest your password",
         html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${
            emailType === "VERIFY" ? "verify your email" : "rest your password"
         } or copy and paste the link below in your browser. <br>
            ${process.env.DOMAIN}/verifyEmail?/token=${hashedToken}
         </p>`,
      };

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
   } catch (error: any) {
      throw new Error(error.message);
   }
};
