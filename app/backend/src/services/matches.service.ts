import TeamModel from '../database/models/TeamModel';
import MatchModel, { IMatchModel } from '../database/models/MatchModel';
import ServiceResult from '../Interfaces/Service';
import IMatchService from '../Interfaces/MatchService';
import Match, { MatchCreate } from '../Interfaces/Match';

const normalize = (match: IMatchModel): Match => match.dataValues;

export default class MatchService implements IMatchService {
  model = MatchModel;

  async findAll(query: Partial<Match>): ServiceResult<Match[]> {
    const result = await this.model.findAll({
      where: query,
      include: [
        { model: TeamModel, attributes: ['teamName'], as: 'homeTeam' },
        { model: TeamModel, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    return { code: 'ok', data: result.map(normalize) };
  }

  async update(id: number, match: Partial<Match>): ServiceResult<Match> {
    const result = await this.model.findByPk(id);
    if (!result) {
      return { code: 'notFound', data: { message: 'Match not found' } };
    }
    if (result.dataValues.inProgress === false) {
      return { code: 'unauthorized', data: { message: 'Match already finished' } };
    }
    result.update(match);
    return { code: 'ok', data: result.dataValues };
  }

  async finishGame(id: number): ServiceResult {
    const result = await this.update(id, { inProgress: false });
    if (result.code !== 'ok') return result;
    return { code: 'ok', data: { message: 'Match finished' } };
  }

  async create(data: MatchCreate): ServiceResult<Match> {
    const result = await this.model.create({ ...data, inProgress: true });
    return { code: 'created', data: result.dataValues };
  }
}
