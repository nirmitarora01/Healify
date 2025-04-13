const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this to another email provider if needed
      auth: {
        user: process.env.EMAIL, // Put your email here in the .env file
        pass: process.env.EMAIL_PASSWORD, // Use your email app password
      },
    });

    await transporter.sendMail({
      from: `"Healifi" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendEmail;
