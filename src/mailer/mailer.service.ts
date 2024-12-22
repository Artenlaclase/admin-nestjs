import { Injectable, Module } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailerService {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',

            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        try {
            await this.transporter.sendMail({
                from: process.env.MAIL_USER,
                to,
                subject,
                html,
            });
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error('Error sent email', error);
            throw error;
        }
    }

   
}
 @Module({
        providers: [MailerService],
        exports: [MailerService], // Esto permite que otros módulos usen MailerService
      })
      export class MailerModule {}