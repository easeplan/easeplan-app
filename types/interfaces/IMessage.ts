export interface IMessage {
  sender: string;
  message: string;
  image: string;
  type: string;
  read: true;
}

export interface IMessageDocument extends IMessage, Document {
  _id: string;
}
