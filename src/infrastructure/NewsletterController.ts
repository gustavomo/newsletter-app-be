import { Request, Response } from 'express';

import Newsletter from '../domain/Newsletter';

import { PostgresNewsletterRepository } from './PostgresNewsletterRepository';
import { PostgresSubscriberRepository } from './PostgresSubscriberRepository';
import S3FileRepository from './S3FileRepository';
import SendGridEmailRepository from './SengridEmailRepository';

import config from '../shared/config';

class NewsletterController {
  public async getAll(_: Request, res: Response): Promise<void> {
    try {
      const NewsletterInstance = new Newsletter(new PostgresNewsletterRepository());
      const newsletters = await NewsletterInstance.getAll();
      res.json(newsletters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const NewsletterInstance = new Newsletter(new PostgresNewsletterRepository());
      const newsletter = await NewsletterInstance.getOne(parseInt(req.params.id));
      res.json(newsletter);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const NewsletterInstance = new Newsletter(new PostgresNewsletterRepository());
      await NewsletterInstance.create(req.body.subject, req.body.content, req.body.file_url);
      res.json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async subscribeEmail(req: Request, res: Response): Promise<void> {
    try {
      const NewsletterInstance = new Newsletter(new PostgresNewsletterRepository(), new PostgresSubscriberRepository());
      await NewsletterInstance.subscribeEmail(parseInt(req.params.id), req.body.email);
      res.json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async unsubscribeEmail(req: Request, res: Response): Promise<void> {
    try {
      const NewsletterInstance = new Newsletter(new PostgresNewsletterRepository(), new PostgresSubscriberRepository());
      await NewsletterInstance.unsubscribeEmail(parseInt(req.params.subscriberId));
      res.json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file provided' });
        return;
      }

      const s3FileRepository = new S3FileRepository();
      const s3Url = await s3FileRepository.uploadFile(req.file, req.file.originalname);

      res.json({ url: s3Url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async submit(req: Request, res: Response): Promise<void> {
    try {
      const newsletter = new Newsletter(new PostgresNewsletterRepository(), new PostgresSubscriberRepository(), new SendGridEmailRepository());
      await newsletter.submit(parseInt(req.params.id), config.FROM_EMAIL);
      res.json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getAllSubscribers(req: Request, res: Response): Promise<void> {
    try {
      const NewsletterInstance = new Newsletter(new PostgresNewsletterRepository(), new PostgresSubscriberRepository());
      const subscribers = await NewsletterInstance.getAllSubscribers(parseInt(req.params.newsletterId));
      res.json(subscribers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new NewsletterController();
