import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../database/models/UserModel';
import { modelStub } from './helper';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('auth', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('POST /login', () => {
    const loginData = {
      email: 'any@mail.com',
      password: 'any_password',
    };

    it('should return 401 if invalid email is provided', async () => {
      modelStub(UserModel, 'findOne', null);
      const result = await request(app).post('/login').send(loginData);
      expect(result).to.have.status(401);
      expect(result.body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('should return 401 if invalid password is provided', async () => {
      modelStub(UserModel, 'findOne', loginData);
      sinon.stub(bcrypt, 'compareSync').returns(false);
      const result = await request(app).post('/login').send(loginData);
      expect(result).to.have.status(401);
      expect(result.body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('should return a token', async () => {
      modelStub(UserModel, 'findOne', {
        email: 'any@mail.com',
        password: 'invalid_password',
      });
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(jwt, 'sign').returns('any_token' as any);
      const result = await request(app).post('/login').send(loginData);
      expect(result).to.have.status(200);
      expect(result.body).to.deep.equal({ token: 'any_token' });
    });
  });

  describe('GET /role', () => {
    it('should return 401 if no token is provided', async () => {
      const result = await request(app).get('/login/role');
      expect(result).to.have.status(401);
      expect(result.body).to.deep.equal({ message: 'Token not found' });
    });

    it('should return 401 if invalid token is provided', async () => {
      const result = await request(app)
        .get('/login/role')
        .set('Authorization', 'Bearer any_token');
      sinon.stub(jwt, 'verify').throws(new Error());
      expect(result).to.have.status(401);
      expect(result.body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('should return 404 if user is not found', async () => {
      sinon.stub(jwt, 'verify').returns({ id: 1 } as any);
      modelStub(UserModel, 'findByPk', null);
      const result = await request(app)
        .get('/login/role')
        .set('Authorization', 'Bearer any_token');
      expect(result).to.have.status(401);
      expect(result.body).to.deep.equal({ message: 'User not found' });
    });

    it('should return the user role', async () => {
      sinon.stub(jwt, 'verify').returns({ id: 1 } as any);
      modelStub(UserModel, 'findByPk', { role: 'any_role' });
      const result = await request(app)
        .get('/login/role')
        .set('Authorization', 'Bearer any_token');
      expect(result).to.have.status(200);
      expect(result.body).to.deep.equal({ role: 'any_role' });
    });
  });
});
