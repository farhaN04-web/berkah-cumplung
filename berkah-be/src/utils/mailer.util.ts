import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { Hasher } from "./hashids.util";

export class Mailer {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT as string),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      debug: false,
      logger: false,
    });
  }


  static async sendPasswordResetEmail(
    email: string,
    name: string,
    resetToken: string
  ): Promise<void> {

    const templatePath = path.join(
      __dirname,
      "../templates/password_reset_email.html"
    );
    let template = fs.readFileSync(templatePath, "utf8");

    template = template.replace("{{new_password}}", resetToken);
    template = template.replace("{{name}}", name);

    const mailOptions = {
      from: `"Broderie App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: template,
    };

    const mailer = new Mailer();
    await mailer.transporter.sendMail(mailOptions);
  }
}
