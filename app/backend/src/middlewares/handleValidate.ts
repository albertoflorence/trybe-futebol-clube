import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

const errorTypeToStatus = (type: string): number => {
  const types = ['any.required', 'string.empty'];
  return types.includes(type) ? 400 : 422;
};

const handleValidate = (schema: ObjectSchema, handleStatus = errorTypeToStatus) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const status = handleStatus(error.details[0].type);
      res.status(status).json({ message: error.message });
      return;
    }

    next();
  };

export default handleValidate;
