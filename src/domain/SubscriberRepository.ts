export interface SubscriberRepository<T> {
  create(newsletter: T): Promise<void>;
  getAllBySubscriberId(id: number): Promise<T[]>;
  remove(id: number): Promise<void>;
}
