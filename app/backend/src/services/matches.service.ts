import MatchModel, { IMatchModel } from '../database/models/MatchModel';
import ServiceResult from '../Interfaces/Service';
import IMatchService from '../Interfaces/MatchService';
import Match from '../Interfaces/Match';

const normalize = (match: IMatchModel): Match => match.dataValues;

export default class MatchService implements IMatchService {
  model = MatchModel;

  async findAll(): ServiceResult<Match[]> {
    const result = await this.model.findAll();
    return { code: 'ok', data: result.map(normalize) };
  }
}
