import nodemailer from "nodemailer";

/**
 * Nodemailer transporter for sending emails.
 */
let sender = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  port: 465,
  host: "smtp.gmail.com",
});

/**
 * Sends an email using the provided mail options.
 */
const sendMail = async (mailOptions) => {
  try {
    await sender.sendMail(mailOptions);
    console.log("Mail sent");
  } catch (error) {
    console.log(error.message);
  }
};

export default sendMail;
