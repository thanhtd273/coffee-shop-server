import * as nodemailer from 'nodemailer';
import { User } from 'src/users/interfaces/user.interface';

export class Email {
  to: string;
  name: string;
  from: string;
  constructor(user: User) {
    (this.to = user.mail), (this.name = user.name);
    this.from = `Trinh Dinh Thanh <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'product') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {},
      });
    }

    return nodemailer.createTransport({
      port: +process.env.EMAIL_PORT,
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async send(subject: string, message: string) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: message,
    };
    await this.newTransport().sendMail(mailOptions);
  }
  async sendPasswordReset(resetToken: string) {
    await this.send(
      'Reset Password',
      `Your password reset token (valid for only 10 minutes). \n${resetToken}\nPaste this string to change password`,
    );
  }
}
