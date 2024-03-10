import Newsletter from '../domain/Newsletter';
import { NewsletterRepository } from '../domain/NewsletterRespository';

class GetOneNewsletter {
  private newsletterRepository: NewsletterRepository<Newsletter>;

  constructor(newsletterRepository: NewsletterRepository<Newsletter>) {
    this.newsletterRepository = newsletterRepository;
  }

  public async run() {
    try {
      const newsletters = await this.newsletterRepository.getAll();
      return newsletters;
    } catch (error) {
      throw error;
    }
  }
}

export default GetOneNewsletter;
