import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { modelStub, modelStubBulk } from './helper';
import MatchModel from '../database/models/MatchModel';
import UserModel from '../database/models/UserModel';

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
    sinon.stub(jwt, 'verify').returns({ id: 1 } as any);
    modelStub(UserModel, 'findByPk', { id: 1 });
  });

  describe('GET /matches', () => {
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
      const result = await request(app)
        .get('/matches?inProgress=false')
        .set('Authorization', 'Bearer any_token');
      expect(result).to.have.status(200);
      expect(result.body).to.deep.equal(data);
    });
  });

  describe('PATCH matches/:id/finish', () => {
    it('should return 200 if match finished', async () => {
      modelStub(MatchModel, 'findByPk', dataInProgress);
      const result = await request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'Bearer any_token');
      expect(result).to.have.status(200);
      expect(result.body).to.deep.equal({ message: 'Match finished' });
    });
  });

  describe('PATCH matches/:id', () => {
    it('should return 404 if match not found', async () => {
      modelStub(MatchModel, 'findByPk', null);
      const result = await request(app)
        .patch('/matches/1')
        .set('Authorization', 'Bearer any_token');
      expect(result).to.have.status(404);
      expect(result.body).to.deep.equal({ message: 'Match not found' });
    });

    it('should return 401 if match already finished', async () => {
      modelStub(MatchModel, 'findByPk', dataNotInProgress);
      const result = await request(app)
        .patch('/matches/1')
        .set('Authorization', 'Bearer any_token');
      expect(result).to.have.status(401);
      expect(result.body).to.deep.equal({ message: 'Match already finished' });
    });

    it('should return 200 if match is updated', async () => {
      modelStub(MatchModel, 'findByPk', dataInProgress);
      const result = await request(app)
        .patch('/matches/1/finish')
        .send({ homeTeamGoals: 3, awayTeamGoals: 1 })
        .set('Authorization', 'Bearer any_token');
      expect(result).to.have.status(200);
    });
  });
});
