import { Request, Response } from 'express';
import TeamService from '../services/teams.service';
import ITeamService from '../Interfaces/TeamService';
import Controller from './controller';

export default class TeamController extends Controller {
  constructor(private teamService: ITeamService = new TeamService()) {
    super();
  }

  async findAll(req: Request, res: Response) {
    const result = await this.teamService.findAll();
    this.handleResponse(res, result);
  }

  async findOne(req: Request, res: Response) {
    const result = await this.teamService.findOne(Number(req.params.id));
    this.handleResponse(res, result);
  }
}
