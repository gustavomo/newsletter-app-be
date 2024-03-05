import { Application, Router } from 'express';
import multer from 'multer';

import NewsletterController from './infrastructure/NewsletterController';

const router = Router();
const upload = multer();

router.get('/newsletters', NewsletterController.getAll);
router.post('/newsletters', NewsletterController.create);
router.get('/newsletters/:id', NewsletterController.getOne);
router.post('/newsletters/:id/emails', NewsletterController.subscribeEmail);
router.post('/newsletters/:id/submit', NewsletterController.submit);
router.get('/newsletters/:newsletterId/subscribers', NewsletterController.getAllSubscribers);
router.delete('/newsletters/subscribers/:subscriberId', NewsletterController.unsubscribeEmail);
router.post('/upload', upload.single('file'), NewsletterController.uploadFile);

const routing = (app: Application) => {
  app.use('/api/v1', router);
};

export default routing;
