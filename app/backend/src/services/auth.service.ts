import { compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import ServiceResult from '../Interfaces/Service';
import IAuthService, { Token } from '../Interfaces/AuthService';
import User, { UserLogin } from '../Interfaces/User';

const generateToken = (id: number): string =>
  sign({ id }, process.env.JWT_SECRET || 'secret');

export const verifyToken = (token: string): number | null => {
  try {
    const { id } = verify(token, process.env.JWT_SECRET || 'secret') as { id: number };
    return id;
  } catch {
    return null;
  }
};

export default class AuthService implements IAuthService {
  model = UserModel;

  async login({ email, password }: UserLogin): ServiceResult<Token> {
    const result = await this.model.findOne({ where: { email } });
    const isCredentialsValid = result && compareSync(password, result.dataValues.password);
    if (!isCredentialsValid) {
      return { code: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const token = generateToken(result.dataValues.id);
    return { code: 'ok', data: { token } };
  }

  async findById(id: number): ServiceResult<User> {
    const user = await this.model.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return { code: 'notFound', data: { message: 'User not found' } };
    }
    return { code: 'ok', data: user.dataValues };
  }
}
