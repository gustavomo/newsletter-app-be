import Subscriber from '../domain/Subscriber';
import { SubscriberRepository } from '../domain/SubscriberRepository';

class CreateSubscriber {
  private subscriberRepository: SubscriberRepository<Subscriber>;

  constructor(subscriberRepository: SubscriberRepository<Subscriber>) {
    this.subscriberRepository = subscriberRepository;
  }

  public async run(email: string, newsletterId: number) {
    try {
      const subscriber = new Subscriber(email, newsletterId);
      await this.subscriberRepository.create(subscriber);
    } catch (error) {
      throw error;
    }
  }
}

export default CreateSubscriber;
