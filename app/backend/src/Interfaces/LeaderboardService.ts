import { Leaderboard } from './Leaderboard';
import ServiceResult from './Service';

export default interface LeaderBoardService {
  getHome(): ServiceResult<Leaderboard[]>;
}
