export interface IWithdrawal extends Document {
  user: string;
  amount: number;
  status: string;
  date: Date;
  transactionId: string;
}
