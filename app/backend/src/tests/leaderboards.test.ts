import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import db from '../database/models';

chai.use(chaiHttp);
const { expect, request } = chai;


describe('/leaderboard', () => {
  beforeEach(() => {
    sinon.restore();
  })

  describe('GET /home', () => {
    it('should return a home leaderboard', async () => {
      sinon.stub(db, 'query').resolves()
      const result = await request(app).get('/leaderboard/home')
      expect(result).to.have.status(200)
      expect(result.body).to.equal('')
    })
  })
})
