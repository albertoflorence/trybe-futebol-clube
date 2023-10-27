import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';
import User from '../../Interfaces/User';

type InferUserCreationAttributes = Optional<User, 'id'>;
export type IUserModel = Model<User, InferUserCreationAttributes>;

export default class UserModel extends Model<User, InferUserCreationAttributes> {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    underscored: true,
  },
);
