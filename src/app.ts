import cors from 'cors';
import express from 'express';

import sequelize from './infrastructure/models';

import routing from './routing';

import config from './shared/config';

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());

routing(app);

sequelize.sync()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
