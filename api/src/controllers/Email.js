const nodemailer = require("nodemailer");

const { EMAILACCOUNT, PASSWORDEMAIL, SMTPHOST, SMTPPORT } = process.env;

async function sendEmail(from, to) {
  const client = nodemailer.createTransport({
    host: SMTPHOST,
    port: SMTPPORT,
    auth: {
      user: EMAILACCOUNT,
      pass: PASSWORDEMAIL,
    },
    requireTLS: true,
  });

  return await client.sendMail(
    {
      to,
      from,
      html: "<div>hola mundo</div>",
      subject: "HENRY ESCLAVISTA XD",
    },
    (error) => {
      if (error) {
        throw Error(error);
      }
      return true;
    }
  );
}

module.exports = sendEmail;
