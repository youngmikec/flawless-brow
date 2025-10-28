import { EMAIL_DETAILS } from "@/constant";
import { MailerSend, EmailParams, Sender } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILSENDER_KEY || '',
});

const sentFrom = new Sender(EMAIL_DETAILS.senderEmail, EMAIL_DETAILS.senderName);

export interface SendEmailOptions {
    recipients: any[];
    subject: string;
    html: string;
    text: string;
}

export const sendEmail = async (options: SendEmailOptions) => {
    const { recipients, subject, html, text } = options;
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(subject)
        .setHtml(html)
        .setText(text);
    return await mailerSend.email.send(emailParams);
}