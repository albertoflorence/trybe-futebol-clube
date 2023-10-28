import { Request, Response } from 'express';

import Controller from './controller';
import IMatchService from '../Interfaces/MatchService';
import MatchService from '../services/matches.service';
import parseBooleanQuery from '../util/queryBooleanParser';

export default class Matches extends Controller {
  constructor(private matchService: IMatchService = new MatchService()) {
    super();
  }

  async findAll(req: Request, res: Response) {
    const { query } = req;
    const result = await this.matchService.findAll(parseBooleanQuery(query));
    this.handleResponse(res, result);
  }

  async finish(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.matchService.finishGame(Number(id));
    this.handleResponse(res, result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const result = await this.matchService.update(Number(id), body);
    this.handleResponse(res, result);
  }

  async create(req: Request, res: Response) {
    const result = await this.matchService.create(req.body);
    this.handleResponse(res, result);
  }
}
