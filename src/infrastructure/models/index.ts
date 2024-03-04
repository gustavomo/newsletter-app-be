import { Sequelize } from 'sequelize';

import Constant from '../../shared/config';

const sequelize = new Sequelize(Constant.DB_NAME, Constant.DB_USER, Constant.DB_PWD, {
  host: 'db',
  dialect: 'postgres',
});

export default sequelize;
