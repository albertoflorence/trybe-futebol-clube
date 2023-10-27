import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { modelStub, modelStubBulk } from './helper';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('teams', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should return all teams', async () => {
    const data = [{ id: 1, teamName: 'any team' }];
    modelStubBulk(TeamModel, 'findAll', data);
    const result = await request(app).get('/teams');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(data);
  });
  it('should return 404 if no team is found', async () => {
    modelStub(TeamModel, 'findByPk', null);
    const result = await request(app).get('/teams/1');
    expect(result).to.have.status(404);
    expect(result.body).to.deep.equal({ message: 'team not found' });
  });
  it('should return a team by id', async () => {
    const data = { id: 1, teamName: 'any team' };
    modelStub(TeamModel, 'findByPk', data);
    const result = await request(app).get('/teams/1');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(data);
  });
});
