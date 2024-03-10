import { SubscriberRepository } from '../domain/SubscriberRepository';

import SubscriberModel from './models/Subscriber';

export class PostgresSubscriberRepository implements SubscriberRepository {
  public async create(newsletter: SubscriberModel) {
    try {
      await SubscriberModel.create({
        email: newsletter.email,
        newsletter_id: newsletter.newsletter_id,
      });
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: number) {
    try {
      await SubscriberModel.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getAllBySubscriberId(id: number) {
    try {
      const newsletter = await SubscriberModel.findAll({
        raw: true,
        where: {
          newsletter_id: id,
        },
      });

      return newsletter!;
    } catch (error) {
      throw error;
    }
  }
}
