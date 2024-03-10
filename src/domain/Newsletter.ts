import NewsletterModel from '../infrastructure/models/Newsletter';
import SubscriberModel from '../infrastructure/models/Subscriber';

import { EmailRepository } from './EmailRepository';
import { NewsletterRepository } from './NewsletterRespository';
import { SubscriberRepository } from './SubscriberRepository';

class Newsletter {
  private newsletterRepository: NewsletterRepository;
  private subscriberRepository: SubscriberRepository;
  private emailRepository: EmailRepository;

  constructor(newsletterRepository: NewsletterRepository, subscriberRepository?: SubscriberRepository, emailRepository?: EmailRepository) {
    this.newsletterRepository = newsletterRepository;
    this.subscriberRepository = subscriberRepository!;
    this.emailRepository = emailRepository!;
  }

  public async getAll() {
    try {
      const users = await this.newsletterRepository.getAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async getOne(id: number) {
    try {
      const users = await this.newsletterRepository.getOne(id);
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async create(subject: string, content: string, fileUrl: string) {
    try {
      const newNewsletter = new NewsletterModel({
        subject: subject,
        content: content,
        file_url: fileUrl,
      });

      await this.newsletterRepository.create(newNewsletter);
    } catch (error) {
      throw error;
    }
  }

  public async subscribeEmail(newsletterId: number, email: string) {
    try {
      const newSubcriber = new SubscriberModel({
        email: email,
        newsletter_id: newsletterId,
      });

      await this.subscriberRepository.create(newSubcriber);
    } catch (error) {
      throw error;
    }
  }

  public async unsubscribeEmail(subscriberId: number) {
    try {
      await this.subscriberRepository.remove(subscriberId);
    } catch (error) {
      throw error;
    }
  }

  public async submit(subscriberId: number, fromEmail: string) {
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

  public async getAllSubscribers(id: number) {
    try {
      const users = await this.subscriberRepository.getAllBySubscriberId(id);
      return users;
    } catch (error) {
      throw error;
    }
  }

  private addUnlink(content: string, id: number) {
    return `${content} <br/> <br/> <a href="http://localhost:3001/unsubscribe/${id}">Unsubscribe</a>`;
  }
}

export default Newsletter;
