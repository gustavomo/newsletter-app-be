import { MailDataRequired } from '@sendgrid/mail';

export interface EmailRepository {
  sendEmail(url: string, to: string,from: string,subject: string,html: string): Promise<void>;
}
