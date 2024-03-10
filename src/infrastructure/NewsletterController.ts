import { Request, Response } from 'express';

import { PostgresNewsletterRepository } from './PostgresNewsletterRepository';
import { PostgresSubscriberRepository } from './PostgresSubscriberRepository';
import S3FileRepository from './S3FileRepository';
import SendGridEmailRepository from './SengridEmailRepository';

import GetAllNewsletters from '../application/GetAllNewsletters';
import GetOneNewsletter from '../application/GetOneNewsletter';
import CreateNewsletter from '../application/CreateNewsletter';
import CreateSubscriber from '../application/CreateSubscriber';
import RemoveSubscriber from '../application/RemoveSubscriber';
import GetAllSubscribers from '../application/GetAllSubscribers';
import SubmitNewsletter from '../application/SubmitNewsletter';

import config from '../shared/config';

class NewsletterController {
  public async getAll(_: Request, res: Response): Promise<void> {
    try {
      const getAllNewsletters = new GetAllNewsletters(new PostgresNewsletterRepository());
      const newsletters = await getAllNewsletters.run();
      res.json(newsletters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const getOneNewsletter = new GetOneNewsletter(new PostgresNewsletterRepository());
      const newsletter = await getOneNewsletter.run(parseInt(req.params.id));
      res.json(newsletter);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const createNewsletter = new CreateNewsletter(new PostgresNewsletterRepository());
      await createNewsletter.run(req.body.subject, req.body.content, req.body.file_url);
      res.json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async subscribeEmail(req: Request, res: Response): Promise<void> {
    try {
      const createSubscriber = new CreateSubscriber(new PostgresSubscriberRepository());
      await createSubscriber.run(req.body.email, parseInt(req.params.id));
      res.json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async unsubscribeEmail(req: Request, res: Response): Promise<void> {
    try {
      const removeSubscriber = new RemoveSubscriber(new PostgresSubscriberRepository());
      await removeSubscriber.run(parseInt(req.params.subscriberId));
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
      const submitNewsletter = new SubmitNewsletter(new PostgresNewsletterRepository(), new PostgresSubscriberRepository(), new SendGridEmailRepository());
      await submitNewsletter.run(parseInt(req.params.id), config.FROM_EMAIL);
      res.json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getAllSubscribers(req: Request, res: Response): Promise<void> {
    try {
      const getAllSubscribers = new GetAllSubscribers(new PostgresSubscriberRepository());
      const subscribers = await getAllSubscribers.run(parseInt(req.params.newsletterId));
      res.json(subscribers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new NewsletterController();
