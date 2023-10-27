import ServiceResult from './Service';
import { UserLogin } from './User';

export interface Token {
  token: string;
}
export default interface AuthService {
  login(data: UserLogin): ServiceResult<Token>;
}
