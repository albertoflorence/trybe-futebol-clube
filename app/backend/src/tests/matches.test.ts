import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { modelStubBulk } from './helper';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);
const { expect, request } = chai;

const dataInProgress = {
  id: 1,
  homeTeamId: 1,
  awayTeamId: 2,
  homeTeamGoals: 1,
  awayTeamGoals: 2,
  inProgress: true,
};

const dataNotInProgress = {
  id: 2,
  homeTeamId: 3,
  awayTeamId: 4,
  homeTeamGoals: 3,
  awayTeamGoals: 1,
  inProgress: false,
};

describe('matches', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should return all matches', async () => {
    const data = [dataInProgress, dataNotInProgress];
    modelStubBulk(MatchModel, 'findAll', data);
    const result = await request(app).get('/matches');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(data);
  });

  it('should return only matches with inProgress = true', async () => {
    const data = [dataInProgress];
    modelStubBulk(MatchModel, 'findAll', data);
    const result = await request(app).get('/matches?inProgress=true');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(data);
  });

  it('should return only matches with inProgress = false', async () => {
    const data = [dataNotInProgress];
    modelStubBulk(MatchModel, 'findAll', data);
    const result = await request(app).get('/matches?inProgress=false');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(data);
  });
});
