import { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

// config from env
require("dotenv").config();
console.log(process.env.GOOGLE_MAIL);
console.log(process.env.GOOGLE_PASS);

const server = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, username, generateToken } = req.body;

  // read a template file (handlebars)
  // @reference
  // https://github.com/vercel/next.js/issues/8251

  const configDirectory = path.resolve(process.cwd(), "views");
  const files = fs
    .readFileSync(path.join(configDirectory, "verification.hbs"), "utf-8")
    .toString();

  const templates = handlebars.compile(files);
  const replacement = {
    email: username,
    actions: `${process.env.NEXT_PUBLIC_URL}/auth/signup/flow/show?email=${email}&t=${generateToken}`,
  };
  const htmlToSend = templates(replacement);

  // transporter for api nodemailer with gmail smtp
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_MAIL,
      pass: process.env.GOOGLE_PASS,
    },
  });

  try {
    const sendMsg = await transporter.sendMail({
      from: "noreply@meraki.dev",
      to: email,
      subject: `Verified your accounts`,
      html: htmlToSend,
    });

    console.log("message sent", sendMsg.messageId);
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(req.body);
};

export default withSentry(server);
