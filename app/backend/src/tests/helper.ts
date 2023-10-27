import { Model, Optional } from 'sequelize';
import {} from 'sequelize/types';
import * as sinon from 'sinon';

const createStub = (builder: string) => (model: any, method: any, data: unknown) => {
  const result = data && model[builder](data);
  sinon.stub(model, method).resolves(result);
};
export const modelStub = createStub('build');
export const modelStubBulk = createStub('bulkBuild');
