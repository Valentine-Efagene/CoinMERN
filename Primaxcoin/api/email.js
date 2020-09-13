const nodemailer = require('nodemailer');

async function sendResetEmail(_, { email, token }) {
  const link =
    process.env.DOMAIN + 'passwordreset?token=' + encodeURIComponent(token);
  console.log(link);

  const message = {
    from: process.env.SENDER_ADDRESS,
    to: email,
    replyTo: process.env.REPLYTO_ADDRESS,
    subject: process.env.FORGOT_PASS_SUBJECT_LINE,
    text: 'To reset your password, please click the link below.\n' + link,
  };
  console.log(message);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });
  console.log(transporter);
  return true;
  /*transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log(info);
      return true;
    }
  });*/
}

module.exports = {
  sendResetEmail,
};
