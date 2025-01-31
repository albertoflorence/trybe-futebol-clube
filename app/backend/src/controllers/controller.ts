import { Response } from 'express';
import { Code, Result } from '../Interfaces/Service';

function mapCodeToHttp(code: Code): number {
  const codes = {
    ok: 200,
    created: 201,
    unauthorized: 401,
    notFound: 404,
    unprocessable: 422,
  };
  return codes[code];
}

export default class Controller {
  protected handleResponse(res: Response, { code, data }: Result) {
    res.status(mapCodeToHttp(code)).json(data);
    return this;
  }
}
