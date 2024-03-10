import NewsLetter from '../infrastructure/models/Newsletter';

export interface NewsletterRepository {
  getAll(): Promise<NewsLetter[]>;
  getOne(id: number): Promise<NewsLetter>;
  create(newsletter: NewsLetter): Promise<void>;
}
