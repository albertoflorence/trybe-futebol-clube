import TeamModel, { ITeamModel } from '../database/models/TeamModel';
import ServiceResult from '../Interfaces/Service';
import Team from '../Interfaces/Team';
import ITeamService from '../Interfaces/TeamService';

const normalize = (team: ITeamModel): Team => ({
  id: team.dataValues.id,
  teamName: team.dataValues.teamName,
});

export default class TeamService implements ITeamService {
  model = TeamModel;

  async findAll(): ServiceResult<Team[]> {
    const result = await this.model.findAll();
    return { code: 'ok', data: result.map(normalize) };
  }

  async findOne(id: number): ServiceResult<Team> {
    const result = await this.model.findByPk(id);
    if (!result) return { code: 'notFound', data: { message: 'team not found' } };
    return { code: 'ok', data: normalize(result) };
  }
}
