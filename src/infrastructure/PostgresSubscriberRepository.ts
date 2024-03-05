import { SubscriberRepository } from "../domain/SubscriberRepository";

import SubscriberModel from "./models/Subscriber";

export class PostgresSubscriberRepository implements SubscriberRepository {
  public async create(newsletter: SubscriberModel) {
    await SubscriberModel.create({
      email: newsletter.email,
      newsletter_id: newsletter.newsletter_id,
    });
  }

  public async remove(id: number) {
    await SubscriberModel.destroy({
      where: {
        id,
      },
    });
  }

  public async getAllBySubscriberId(id: number) {
    const newsletter = await SubscriberModel.findAll({
      raw: true,
      where: {
        newsletter_id: id,
      },
    });

    return newsletter!;
  }
}
