import nodeMailer from "nodemailer"
interface Properties{
    email:string,
    emailType:String,
    userID:String,
}

export const sendEmail = async({email,emailType,userID}:Properties)=>{
    try {
      //TODO: configure mail of usage
        const transporter = nodeMailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

        const mailOptions = {
            from: 'aakash@aakash.ai',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email":"Rest your password",
            html: "<b>Hello world?</b>",
          }
        
         const mailResponse = await transporter.sendMail(mailOptions);
         return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}