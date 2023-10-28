import ServiceResult from './Service';
import Match from './Match';

export default interface MatchService {
  findAll(query: Partial<Match>): ServiceResult<Match[]>;
}
