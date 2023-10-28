import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { modelStubBulk } from './helper';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('matches', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should return all matches', async () => {
    const data = [
      {
        id: 1,
        homeTeamId: 1,
        awayTeamId: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 2,
        inProgress: true,
      },
    ];
    modelStubBulk(MatchModel, 'findAll', data);
    const result = await request(app).get('/matches');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(data);
  });
});
