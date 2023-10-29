import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const route = Router();

const controller = new LeaderboardController();

route.get('/home', (req, res) => controller.getHome(req, res));

export default route;
