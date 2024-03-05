import { NewsletterRepository } from "../domain/NewsletterRespository";

import NewsletterModel from "./models/Newsletter";

export class PostgresNewsletterRepository implements NewsletterRepository {
  public async create(newsletter: NewsletterModel) {
    await NewsletterModel.create({
      subject: newsletter.subject,
      content: newsletter.content,
      file_url: newsletter.file_url,
    });
  }

  public async getAll() {
    const newsletter = await NewsletterModel.findAll({
      raw: true,
    });

    return newsletter!;
  }

  public async getOne(id: number) {
    const newsletter = await NewsletterModel.findOne({
      raw: true,
      where: {
        id,
      },
    });

    return newsletter!;
  }
}
