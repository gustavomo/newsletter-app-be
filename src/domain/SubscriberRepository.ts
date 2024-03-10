import Subscriber from './Subscriber';

export interface SubscriberRepository {
  create(newsletter: Subscriber): Promise<void>;
  getAllBySubscriberId(id: number): Promise<Subscriber[]>;
  remove(id: number): Promise<void>;
}
