import { Router } from 'express';
import MatchController from '../controllers/matches.controller';
import { authentication } from '../middlewares/auth.validate';

const route = Router();

const controller = new MatchController();

route.get('/', (req, res) => controller.findAll(req, res));
route.patch('/:id/finish', authentication, (req, res) => controller.finish(req, res));
route.patch('/:id', authentication, (req, res) => controller.update(req, res));

export default route;
