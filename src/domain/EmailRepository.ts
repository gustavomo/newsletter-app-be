import { MailDataRequired } from '@sendgrid/mail';

export type TSendEmailParams = {
  url: string;
  to: string;
  from: string;
  subject: string;
  html: string;
};

export interface EmailRepository {
  sendEmail(params: TSendEmailParams): Promise<void>;
}
