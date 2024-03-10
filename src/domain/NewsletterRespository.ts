export interface NewsletterRepository<T> {
  getAll(): Promise<T[]>;
  getOne(id: number): Promise<T>;
  create(newsletter: T): Promise<void>;
}
