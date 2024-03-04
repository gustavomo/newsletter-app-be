import { Application, Router } from 'express';
import multer from 'multer';

import NewsletterController from './infrastructure/NewsletterController';

const router = Router();
const upload = multer();

router.get('/newsletters', NewsletterController.getAll);
router.get('/newsletters/:id', NewsletterController.getOne);
router.post('/newsletters', NewsletterController.create);
router.post('/newsletters/:id/emails', NewsletterController.subscribeEmail);
router.delete('/newsletters/subscribers/:subscriberId', NewsletterController.unsubscribeEmail);
router.post('/upload', upload.single('file'), NewsletterController.uploadFile);
router.post('/newsletters/:id/submit', NewsletterController.submit);

const routing = (app: Application) => {
  app.use('/api/v1', router);
};

export default routing;
