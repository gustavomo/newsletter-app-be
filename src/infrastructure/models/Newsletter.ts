
import { Model, DataTypes } from 'sequelize';

import sequelize from './index';

class NewsletterModel extends Model {
  public id!: number;
  public subject!: string;
  public content!: string;
  public file_url!: string;
}

NewsletterModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'newsletters',
  }
);

export default NewsletterModel;
