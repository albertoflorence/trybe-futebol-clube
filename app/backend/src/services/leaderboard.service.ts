import { QueryTypes } from 'sequelize';
import db from '../database/models';
import {
  Leaderboard,
} from '../Interfaces/Leaderboard';
import ServiceResult from '../Interfaces/Service';
import ILeaderboardService from '../Interfaces/LeaderboardService';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import leaderboardQuery from './leaderboardQuery';

export default class LeaderboardService implements ILeaderboardService {
  teamModel = TeamModel;
  matchModel = MatchModel;
  db = db;

  async getHome(): ServiceResult<Leaderboard[]> {
    const result = (await this.db.query(leaderboardQuery, {
      type: QueryTypes.SELECT,
    })) as Leaderboard[];

    return { code: 'ok', data: result };
  }
}
