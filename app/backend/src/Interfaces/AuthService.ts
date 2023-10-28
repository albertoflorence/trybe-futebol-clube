import ServiceResult from './Service';
import User, { UserLogin } from './User';

export interface Token {
  token: string;
}
export default interface AuthService {
  login(data: UserLogin): ServiceResult<Token>;
  findById(id: number): ServiceResult<User>;
}
