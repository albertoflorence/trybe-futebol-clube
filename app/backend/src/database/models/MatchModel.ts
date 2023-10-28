import { DataTypes, Model, Optional } from 'sequelize';
import Match from '../../Interfaces/Match';
import db from '.';
import TeamModel from './TeamModel';

type InferOrderCreationAttributes = Optional<Match, 'id'>;
export type IMatchModel = Model<Match, InferOrderCreationAttributes>;

export default class MatchModel extends Model<Match, InferOrderCreationAttributes> {}

MatchModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Match',
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

MatchModel.belongsTo(TeamModel, {
  as: 'homeTeam',
  foreignKey: 'homeTeamId',
  targetKey: 'id',
});

MatchModel.belongsTo(TeamModel, {
  as: 'awayTeam',
  foreignKey: 'awayTeamId',
  targetKey: 'id',
});
