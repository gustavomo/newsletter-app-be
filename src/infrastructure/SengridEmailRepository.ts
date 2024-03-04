import axios from 'axios';
import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';

import { EmailRepository } from '../domain/EmailRepository';

class SendGridEmailRepository implements EmailRepository {

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendEmail(url: string, to: string, from: string, subject: string, html: string): Promise<void> {
    try {
      const content = await this.getUrlContent(url);
      const extension = this.getExtension(url);

      const msg: MailDataRequired = {
        to,
        from,
        subject,
        text: 'newsletter system',
        html,
        attachments: [
          {
            content,
            filename: `attachment.${extension}`,
            type: `application/${extension}`,
            disposition: 'attachment'
          }
        ]
      };

      await sgMail.send(msg);
    } catch (error: any) {
      console.error('Error sending email:', error.response.body);
      // throw new Error('Error sending email');
    }
  }

  getUrlContent = async (url: string): Promise<string> => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64Content = Buffer.from(response.data, 'binary').toString('base64');

    return base64Content;
  }

  getExtension(url: string): string {
    return url.split('.').pop()!;
  }
}

export default SendGridEmailRepository;