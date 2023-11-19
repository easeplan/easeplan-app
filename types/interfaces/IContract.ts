import { IServiceProvider } from './IServiceProvider';
import { IUser } from './IUser';

export interface IContract {
  _id: string;
  parties: { sender: IUser; receiver: IUser };
  state: string;
  city: string;
  dateTime: string;
  budget: number;
  service: string;
  createdAt: Date;
  status: string;
  role: string;
}
