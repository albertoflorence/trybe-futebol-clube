import Joi = require('joi');
import { NextFunction, Request, Response } from 'express';
import AuthService, { verifyToken } from '../services/auth.service';
import handleValidate from './handleValidate';

const service = new AuthService();

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
  'string.email': 'Invalid email or password',
  'string.min': 'Invalid email or password',
});

const handleStatus = (type: string): number => {
  if (['string.email', 'string.min'].includes(type)) return 401;
  if (['any.required', 'string.empty'].includes(type)) return 400;

  return 422;
};

const login = handleValidate(schema, handleStatus);

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = req.headers.authorization.split(' ')[1];
  const id = verifyToken(token);
  if (!id) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  const { data } = await service.findById(id);
  if ('message' in data) {
    return res.status(401).json({ message: 'User not found' });
  }
  req.locals = { user: data };
  next();
};

export default {
  login,
};
