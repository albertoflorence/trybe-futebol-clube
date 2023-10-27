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

describe('teams', () => {
  beforeEach(() => {
    sinon.restore();
  });

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
    const result = await request(app).post('/login');
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal({ token: 'any_token' });
  });
});
