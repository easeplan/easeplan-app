import { IUser } from './IUser';

export interface IToken {
  user: IUser;
  token: string;
}
