import nodemailer from "nodemailer";

let sender = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  port: 465,
  host: "smtp.gmail.com",
});

const sendMail = async (mailOptions) => {
  try {
    await sender.sendMail(mailOptions);
    console.log("Mail sent");
  } catch (error) {
    console.log(error.message);
  }
};

export default sendMail;
