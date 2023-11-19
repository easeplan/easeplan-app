import { IReview } from './IReview';
import { IAccountDetails } from './IAccountDetails';

export interface IServiceProvider {
  _id: string;
  userId: string;
  publicId: string;
  state: string;
  city: string;
  business: IBusiness;
  identityVerify?: IIdentity;
  introVideo?: string;
  verified: boolean;
  dob: string;
  gender: string;
  company: ICompany;
  samples: [
    {
      _id?: string;
      image: string;
      title: string;
      description: string;
    },
  ];
  budget: {
    maximum: number;
    minimum: number;
  };
  ratings: [IReview];
  rating: number;
  selections: [
    {
      date: Date;
      count: number;
    },
  ];
  createdAt: Date;
  events: Map<
    string,
    {
      status: string;
      bookedOn: string | null;
      declined: boolean;
      declinedReason?: string | null;
      cancelReason?: string | null;
      currentJob: string | null;
    }
  >;
  balance: number;
  role: string;
  clients: string[];
  responseTimes: number[];
  currentlyHiredBy: string[];
  currentlyRequestedBy: string[];
  averageResponseTime: number;
  accountDetails: IAccountDetails;
  availbalance: number;
  approved: boolean;
  registered: boolean;
  cacNumber: string;
  cac_registration: {
    registeredName: string;
    officeAddress: string;
    cacNumber: string;
  };
  bvn: string;
  nin: string;
  addSamples(
    samples:
      | { image: string; title: string; description: string }[]
      | { image: string; title: string; description: string },
  ): Promise<this>;
  updateSample(
    sampleId: string,
    sampleData: { image: string; title: string; description: string },
  ): Promise<this>;
  deleteSample(sampleId: string): Promise<this>;
  verifyId(userId: string): Promise<this>;
}

export interface IIdentity {
  idType?: string;
  country?: string;
  idDocument?: string;
  verified?: boolean;
}

export interface IBusiness {
  businessName: string;
  officeAddress: string;
  homeAddress: string;
}

export interface ICompany {
  name: string;
  services: string[];
  operationStates: string[];
  operationCities: string[];
  image: string;
  description: string;
}
