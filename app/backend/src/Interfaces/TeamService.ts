import ServiceResult from './Service';
import Team from './Team';

export default interface TeamService {
  findAll(): ServiceResult<Team[]>;
  findOne(id: number): ServiceResult<Team>;
}
