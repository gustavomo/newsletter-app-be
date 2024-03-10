import SubscriberModel from '../infrastructure/models/Subscriber';

export interface SubscriberRepository {
  create(newsletter: SubscriberModel): Promise<void>;
  getAllBySubscriberId(id: number): Promise<SubscriberModel[]>;
  remove(id: number): Promise<void>;
}
