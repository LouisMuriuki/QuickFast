import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import Email from "../mongo/models/emailSchema.ts";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
dotenv.config();

const sendEmail = async (
  req: {
    query: {
      email: {
        ownerId:string,
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
  const { ownerId, from, to, subject, cc, body, attachment } = req.query.email;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      from: process.env.EMAIL,
      pass: process.env.EMAILPASS,
    },
  }as SMTPTransport.Options);

  let details = {
    from,
    to,
    cc,
    subject,
    text: body,
    attachments: [
      {
        filename: attachment.filename,
        content: attachment.content,
        encoding: attachment.encoding,
      },
    ],
  };
  try {
    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("it has an error", err);
        return res.status(500).json({ success: false, error: err });
      } else {
        const savedemail=Email.create({ownerId,...details})
        console.log("email is sent");
        if(savedemail){
            return res
            .status(200)
            .json({ success: true, data: savedemail, status: 200 });
        }
      }
    });
  } catch (error) {
    console.log("error",error);
  }
};

export {sendEmail}