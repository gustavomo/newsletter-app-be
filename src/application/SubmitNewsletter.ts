import { EmailRepository } from '../domain/EmailRepository';
import Newsletter from '../domain/Newsletter';
import { NewsletterRepository } from '../domain/NewsletterRespository';
import Subscriber from '../domain/Subscriber';
import { SubscriberRepository } from '../domain/SubscriberRepository';

class SubmitNewsletter {
  private newsletterRepository: NewsletterRepository<Newsletter>;
  private subscriberRepository: SubscriberRepository<Subscriber>;
  private emailRepository: EmailRepository;

  constructor(newsletterRepository: NewsletterRepository<Newsletter>, subscriberRepository: SubscriberRepository<Subscriber>, emailRepository: EmailRepository) {
    this.newsletterRepository = newsletterRepository;
    this.subscriberRepository = subscriberRepository;
    this.emailRepository = emailRepository;
  }

  public async run(subscriberId: number, fromEmail: string) {
    try {
      const newsletter = await this.newsletterRepository.getOne(subscriberId);
      const subscribers = await this.subscriberRepository.getAllBySubscriberId(subscriberId);

      for (let i = 0; i < subscribers.length; i++) {
        const subscriber = subscribers[i];

        await this.emailRepository.sendEmail({
          from: fromEmail,
          html: this.addUnlink(newsletter.content, subscriber.id),
          subject: newsletter.subject,
          to: subscriber.email,
          url: newsletter.file_url,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  private addUnlink(content: string, id: number) {
    return `${content} <br/> <br/> <a href="http://localhost:3001/unsubscribe/${id}">Unsubscribe</a>`;
  }
}

export default SubmitNewsletter;
