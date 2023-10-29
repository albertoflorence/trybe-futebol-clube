import { Request, Response } from 'express';
import ILeaderboardService from '../Interfaces/LeaderboardService';
import Controller from './controller';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController extends Controller {
  constructor(
    private leaderboardService: ILeaderboardService = new LeaderboardService(),
  ) {
    super();
  }

  async getHome(req: Request, res: Response) {
    const result = await this.leaderboardService.getHome();
    this.handleResponse(res, result);
  }

  async getAway(req: Request, res: Response) {
    const result = await this.leaderboardService.getAway();
    this.handleResponse(res, result);
  }
}
