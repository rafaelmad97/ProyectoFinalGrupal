const nodemailer = require("nodemailer");

const { EMAILACCOUNT, PASSWORDEMAIL, SMTPHOST, SMTPPORT } = process.env;

async function sendEmail(from, to, subject, html) {
  const client = nodemailer.createTransport({
    host: SMTPHOST,
    port: SMTPPORT,
    auth: {
      user: EMAILACCOUNT,
      pass: PASSWORDEMAIL,
    },
    requireTLS: true,
  });

  try {
    await client.sendMail({
      to,
      from,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
}

//PLANTILLA DE REGISTRO

module.exports = sendEmail;
