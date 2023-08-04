import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import Email from "../mongo/models/emailSchema.ts";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
dotenv.config();

const sendEmail = async (
  req: {
    body: {
      emailSend: {
        ownerId: string;
        from: string;
        to: string;
        subject: string;
        body: string;
        cc: string[];
        attachment: {
          filename: string;
          content: any;
          encoding: any;
        };
      };
    };
  },
  res: any
) => {
  console.log(req);
  const { ownerId, from, to, subject, cc, body, attachment } =
    req.body.emailSend;

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      type: "OAuth2",
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      refreshToken: process.env.REFRESHTOKEN,
      accessToken: process.env.ACCESSTOKEN,
    },
  } as SMTPTransport.Options);

  let details = {
    from,
    to,
    cc,
    subject,
    text: body,
    attachments: [attachment],
  };
  try {
    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("it has an error", err);
        return res.status(500).json({ success: false, error: err });
      } else {
        const savedemail = Email.create({
          ownerId,
          from,
          to,
          cc,
          subject,
          text: body,
          attachments: attachment,
        });
        console.log("email is sent");
        if (savedemail) {
          return res
            .status(200)
            .json({ success: true, data: savedemail, status: 200 });
        }
      }
    });
  } catch (error) {
       res.status(500).json({ success: false, error: error });
  }
};

export { sendEmail };
