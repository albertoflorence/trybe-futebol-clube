import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const route = Router();

const controller = new LeaderboardController();

route.get('/', (req, res) => controller.findAll(req, res));
route.get('/home', (req, res) => controller.findHome(req, res));
route.get('/away', (req, res) => controller.findAway(req, res));

export default route;
