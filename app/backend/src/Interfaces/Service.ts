interface ResultError {
  message: string;
}

export type Code = 'ok' | 'notFound' | 'unauthorized' | 'created';

export interface Result<T = unknown> {
  code: Code;
  data: T | ResultError;
}

type ServiceResult<T = unknown> = Promise<Result<T>>;

export default ServiceResult;
