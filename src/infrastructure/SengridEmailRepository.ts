import axios from 'axios';

import { EmailRepository } from '../domain/EmailRepository';

class SendGridEmailRepository implements EmailRepository {

  constructor() { }

  async sendEmail(url: string, to: string, from: string, subject: string, html: string): Promise<void> {
    try {
      const params = {
        to,
        url,
        from,
        subject,
        html,
      };
      const response = await axios.post(process.env.EMAIL_URL!, params);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export default SendGridEmailRepository;