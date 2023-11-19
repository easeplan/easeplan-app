import { IMessage } from './IMessage';
import { IUser } from './IUser';

export interface IConversation {
  participants: IUser[];
  lastMessage: IMessage;
}

export interface IConversationDocument extends IConversation, Document {
  _id: string;
}
