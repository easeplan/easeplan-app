import { IUser } from './IUser';
export interface IPayment {
  user: IUser; // Reference to a User document
  contract: string; // Reference to an Order document
  paymentMethod: string;
  amount: number;
  currency: string;
  status: string;
  paymentDate: Date;
  cardDetails: {
    cardType: string;
    lastFourDigits: number;
    expiryDate: string;
  };
  // billingAddress: string;
  transactionId: string;
}
