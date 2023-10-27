import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const route = Router();

const controller = new TeamController();

route.get('/', (req, res) => controller.findAll(req, res));
route.get('/:id', (req, res) => controller.findOne(req, res));

export default route;
