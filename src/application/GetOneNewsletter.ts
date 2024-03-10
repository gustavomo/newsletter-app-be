import Newsletter from '../domain/Newsletter';
import { NewsletterRepository } from '../domain/NewsletterRespository';

class GetOneNewsletter {
  private newsletterRepository: NewsletterRepository<Newsletter>;

  constructor(newsletterRepository: NewsletterRepository<Newsletter>) {
    this.newsletterRepository = newsletterRepository;
  }

  public async run(id: number) {
    try {
      const newsletter = await this.newsletterRepository.getOne(id);
      return newsletter;
    } catch (error) {
      throw error;
    }
  }
}

export default GetOneNewsletter;
