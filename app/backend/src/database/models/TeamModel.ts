import { DataTypes, Model, Optional } from 'sequelize';
import Team from '../../Interfaces/Team';
import db from '.';

type InferOrderCreationAttributes = Optional<Team, 'id'>;
export type ITeamModel = Model<Team, InferOrderCreationAttributes>;

export default class TeamModel extends Model<Team, InferOrderCreationAttributes> {}

TeamModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Team',
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);
