import Newsletter from './Newsletter';

export interface NewsletterRepository {
  getAll(): Promise<Newsletter[]>;
  getOne(id: number): Promise<Newsletter>;
  create(newsletter: Newsletter): Promise<void>;
}
