import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import v, { authorization } from '../middlewares/auth.validate';

const route = Router();

const controller = new AuthController();

route.post('/', v.login, (req, res) => controller.login(req, res));
route.get('/role', authorization, (req, res) => controller.getRole(req, res));

export default route;
