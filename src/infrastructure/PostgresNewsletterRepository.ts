import { NewsletterRepository } from '../domain/NewsletterRespository';

import NewsletterModel from './models/Newsletter';

export class PostgresNewsletterRepository implements NewsletterRepository {
  public async create(newsletter: NewsletterModel) {
    try {
      await NewsletterModel.create({
        subject: newsletter.subject,
        content: newsletter.content,
        file_url: newsletter.file_url,
      });
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const newsletter = await NewsletterModel.findAll({
        raw: true,
      });

      return newsletter!;
    } catch (error) {
      throw error;
    }
  }

  public async getOne(id: number) {
    try {
      const newsletter = await NewsletterModel.findOne({
        raw: true,
        where: {
          id,
        },
      });

      return newsletter!;
    } catch (error) {
      throw error;
    }
  }
}
