import TeamModel from '../database/models/TeamModel';
import MatchModel, { IMatchModel } from '../database/models/MatchModel';
import ServiceResult from '../Interfaces/Service';
import IMatchService from '../Interfaces/MatchService';
import Match from '../Interfaces/Match';

const normalize = (match: IMatchModel): Match => match.dataValues;

export default class MatchService implements IMatchService {
  model = MatchModel;

  async findAll(): ServiceResult<Match[]> {
    const result = await this.model.findAll({
      include: [
        { model: TeamModel, attributes: ['teamName'], as: 'homeTeam' },
        { model: TeamModel, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    return { code: 'ok', data: result.map(normalize) };
  }
}
