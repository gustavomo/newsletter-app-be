import Subscriber from '../domain/Subscriber';
import { SubscriberRepository } from '../domain/SubscriberRepository';

class GetAllSubscribers {
  private subscriberRepository: SubscriberRepository<Subscriber>;

  constructor(subscriberRepository: SubscriberRepository<Subscriber>) {
    this.subscriberRepository = subscriberRepository;
  }

  public async run(newsletterId: number) {
    try {
      const subscribers = await this.subscriberRepository.getAllBySubscriberId(newsletterId);
      return subscribers;
    } catch (error) {
      throw error;
    }
  }
}

export default GetAllSubscribers;
