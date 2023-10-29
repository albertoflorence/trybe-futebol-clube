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

  async findHome(req: Request, res: Response) {
    const result = await this.leaderboardService.findHome();
    this.handleResponse(res, result);
  }

  async findAway(req: Request, res: Response) {
    const result = await this.leaderboardService.findAway();
    this.handleResponse(res, result);
  }

  async findAll(req: Request, res: Response) {
    const result = await this.leaderboardService.findAll();
    this.handleResponse(res, result);
  }
}
