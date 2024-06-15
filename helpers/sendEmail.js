import nodemailer from "nodemailer";
import 'dotenv/config'

const { USER_EMAIL, USER_PASSWORD, USER_SERVICE } = process.env;

//configuracion del credenciales del correo

let transporter = nodemailer.createTransport({
    service: USER_SERVICE,
    auth: {
      user: USER_EMAIL,
      pass: USER_PASSWORD,
    },
  });

  //configurar opciones de envio de correo

  export const sendEmail = async ( name, email, subject, message  ) => {
  
  
    let mailOptions = {
      from: email,
      to: USER_EMAIL.concat(", ", email),
      subject: subject,
      html: `<h6>Name: ${name}</h6><h6>Email: ${email}</h6><h6>Message: ${message}</h6>`,
    };
    
    try {
      const result = transporter.sendMail(mailOptions);
      return result;
    } catch (e) {
      throw e;
    }
  };