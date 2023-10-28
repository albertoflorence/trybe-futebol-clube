import ServiceResult from './Service';
import Match, { MatchCreate } from './Match';

export default interface MatchService {
  findAll(query: Partial<Match>): ServiceResult<Match[]>;
  update(id: number, match: Partial<Match>): ServiceResult<Match>;
  finishGame(id: number): ServiceResult;
  create(data: MatchCreate): ServiceResult<Match>;
}
