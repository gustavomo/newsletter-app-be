
import { Model, DataTypes } from 'sequelize';

import sequelize from './index';

class SubscriberModel extends Model {
  public id!: number;
  public email!: string;
  public newsletter_id!: number;
}

SubscriberModel.init(
  {
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
  },
  {
    sequelize,
    modelName: 'subscribers',
  }
);

export default SubscriberModel;
