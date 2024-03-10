import Newsletter from '../domain/Newsletter';
import { NewsletterRepository } from '../domain/NewsletterRespository';

class CreateNewsletter {
  private newsletterRepository: NewsletterRepository<Newsletter>;

  constructor(newsletterRepository: NewsletterRepository<Newsletter>) {
    this.newsletterRepository = newsletterRepository;
  }

  public async run(subject: string, content: string, fileUrl: string) {
    try {
      const newsletter = new Newsletter(subject, content, fileUrl);
      await this.newsletterRepository.create(newsletter);
    } catch (error) {
      throw error;
    }
  }
}

export default CreateNewsletter;
