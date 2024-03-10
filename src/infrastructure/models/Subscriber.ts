import { DataTypes } from 'sequelize';

import sequelize from './index';

const SubscriberModel = sequelize.define('subscribers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  newsletter_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default SubscriberModel;
