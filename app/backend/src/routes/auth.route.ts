import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const route = Router();

const controller = new AuthController();

route.post('/', (req, res) => controller.login(req, res));

export default route;
