import { IUser } from '../interfaces/IUser';
export type IFeedback = {
  _id?: string;
  user: IUser;
  content: string;
};
