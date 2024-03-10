import axios from 'axios';

import { EmailRepository, TSendEmailParams } from '../domain/EmailRepository';

import config from '../shared/config';

class SendGridEmailRepository implements EmailRepository {
  constructor() { }

  public async sendEmail(params: TSendEmailParams): Promise<void> {
    try {
      await axios.post(config.EMAIL_URL, params);
    } catch (error) {
      throw error;
    }
  }
}

export default SendGridEmailRepository;
