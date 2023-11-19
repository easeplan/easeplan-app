export interface IDeclinedProvider {
  providerId: string;
  declinedAt: Date;
}

export interface IProfile {
  _id: string;
  userId: string;
  city: string;
  state: string;
  picture: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  recentlyDeclinedProviders: IDeclinedProvider[];
}
