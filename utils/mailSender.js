const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendMail(options) {
  return transporter.sendMail(options);
}

module.exports = sendMail;

