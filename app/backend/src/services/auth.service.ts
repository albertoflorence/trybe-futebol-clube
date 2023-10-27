import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import ServiceResult from '../Interfaces/Service';
import IAuthService, { Token } from '../Interfaces/AuthService';
import { UserLogin } from '../Interfaces/User';

const generateToken = (email: string): string =>
  sign({ email }, process.env.JWT_SECRET || 'secret');

export default class AuthService implements IAuthService {
  model = UserModel;

  async login({ email, password }: UserLogin): ServiceResult<Token> {
    const result = await this.model.findOne({ where: { email } });
    const isCredentialsValid = result && compareSync(password, result.dataValues.password);
    if (!isCredentialsValid) {
      return { code: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const token = generateToken(email);
    return { code: 'ok', data: { token } };
  }
}
