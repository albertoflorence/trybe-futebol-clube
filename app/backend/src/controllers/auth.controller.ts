import { Request, Response } from 'express';
import Controller from './controller';
import IAuthService from '../Interfaces/AuthService';
import AuthService from '../services/auth.service';

export default class Auth extends Controller {
  constructor(private authService: IAuthService = new AuthService()) {
    super();
  }

  async login(req: Request, res: Response) {
    const result = await this.authService.login(req.body);
    this.handleResponse(res, result);
  }

  async getRole(req: Request, res: Response) {
    const { user } = req.locals;
    res.status(200).json({ role: user.role });
    return this;
  }
}
