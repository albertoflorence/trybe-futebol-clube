import { Router } from 'express';
import MatchController from '../controllers/matches.controller';

const route = Router();

const controller = new MatchController();

route.get('/', (req, res) => controller.findAll(req, res));

export default route;
