// utils/mailer.js
const nodemailer = require('nodemailer');

const sendReportEmail = async (to, subject, text, attachmentPath) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // email bạn
      pass: process.env.EMAIL_PASS, // mật khẩu ứng dụng (app password)
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename: 'report.pdf',
        path: attachmentPath,
      },
    ],
  });
};

module.exports = sendReportEmail;
