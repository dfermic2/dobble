require("dotenv").config();

const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;
  const auth = {
    auth: {
      api_key: process.env.EMAIL_API,
      domain: process.env.EMAIL_DOMAIN,
    },
  };

  const transport = nodemailer.createTransport(mailgun(auth));
  try {
    const info = await transport.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Dobble page email from ${email}`,
      text: `New message from ${name}: ${message}`,
    });

    return res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = { sendEmail };
