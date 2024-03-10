import Subscriber from '../domain/Subscriber';
import { SubscriberRepository } from '../domain/SubscriberRepository';

class RemoveSubscriber {
  private subscriberRepository: SubscriberRepository<Subscriber>;

  constructor(subscriberRepository: SubscriberRepository<Subscriber>) {
    this.subscriberRepository = subscriberRepository;
  }

  public async run(id: number) {
    try {
      await this.subscriberRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}

export default RemoveSubscriber;
