import SubscriberModel from "../infrastructure/models/Subscriber";

export interface SubscriberRepository {
  create(newsletter: SubscriberModel): Promise<void>;
  remove(id: number): Promise<void>;
  getAllBySubscriberId(id: number): Promise<SubscriberModel[]>;
}
