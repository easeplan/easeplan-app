import { IServiceProvider } from './IServiceProvider';
import { IContract } from './IContract';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  phoneNumber: string;
  roles: string[];
  role: string;
  emailVerified: boolean;
  igAccessToken: string;
  igUserId: number;
  onboardStage: number;
  hasVisited: true;
  profile: IProfile;
  providerProfile: IServiceProvider;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastActive: Date;
  referedBy: string;
  recentlyDeclinedProviders: IDeclinedProvider[];
  city: string;
  state: string;
  publicId: string;
  contracts: IContract[];
  dob: string;
  gender: string;
}

export interface IDeclinedProvider {
  providerId: string;
  declinedAt: Date;
}
export interface IUserInputDTO {
  email: string;
  password: string;
  // verificationToken: string;
  // verificationTokenExpiration: number,
  isActive: boolean;
  referedBy: string;
}

export interface UserInputDTOProfile {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  isActive: boolean;
  referedBy: string;
  emailVerified: boolean;
}

export interface IAdminInputDTO {
  email: string;
  password: string;
  // verificationToken: string;
  // verificationTokenExpiration: number;
  role: string;
}

export type IUserSession = {
  id: string;
  role: string;
  email: string;
};

export type IProfile = {
  firstName: string;
  lastName: string;
  picture?: string;
};
