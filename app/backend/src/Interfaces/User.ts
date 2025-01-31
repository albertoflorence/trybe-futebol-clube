export default interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type UserLogin = Pick<User, 'email' | 'password'>;
