import { Leaderboard } from './Leaderboard';
import ServiceResult from './Service';

export default interface LeaderBoardService {
  findHome(): ServiceResult<Leaderboard[]>;
  findAway(): ServiceResult<Leaderboard[]>;
  findAll(): ServiceResult<Leaderboard[]>;
}
