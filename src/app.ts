import express from 'express';
import multer from 'multer';
import cors from 'cors';

import sequelize from './infrastructure/models';
import NewsletterController from './infrastructure/NewsletterController';

import config from './shared/config';

const app = express();
const upload = multer();

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.get('/api/v1/newsletters', NewsletterController.getAll);
app.get('/api/v1/newsletters/:id', NewsletterController.getOne);
app.post('/api/v1/newsletters', NewsletterController.create);
app.post('/api/v1/newsletters/:id/emails', NewsletterController.subscribeEmail);
app.delete('/api/v1/newsletters/:newsletterId/subscribers/:subscriberId', NewsletterController.unsubscribeEmail);
app.post('/api/v1/upload', upload.single('file'), NewsletterController.uploadFile);
app.post('/api/v1/newsletters/:id/submit', NewsletterController.submit);

sequelize.sync()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
