import { Request, Response } from 'express';
import Controller from './controller';
import IMatchService from '../Interfaces/MatchService';
import MatchService from '../services/matches.service';

export default class Matches extends Controller {
  constructor(private matchService: IMatchService = new MatchService()) {
    super();
  }

  async findAll(req: Request, res: Response) {
    const result = await this.matchService.findAll();
    this.handleResponse(res, result);
  }
}
