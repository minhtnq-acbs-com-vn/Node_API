import nodemailer from "nodemailer";

const sentMail = async (receiver, subject, body) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "1959018@itec.hcmus.edu.vn",
      pass: process.env.emailKey,
    },
  });

  let mailOptions = {
    from: "1959018@itec.hcmus.edu.vn",
    to: receiver,
    subject: subject,
    text: body,
  };

  let { error, info } = await transporter.sendMail(mailOptions);
  return { error, info };
};

export { sentMail };
