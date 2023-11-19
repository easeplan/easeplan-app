import { IReview } from './IReview';
import { IRating } from './IRatings';

export interface IEventPlanner {
  package: {
    basic: {
      service: [];
      price: number;
    };
    standard: {
      service: [];
      price: number;
    };
    premium: {
      service: [];
      price: number;
    };
  };
  _id: string;
  publicId: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  picture: string;
  city: string;
  state: string;
  business: IBusiness;
  identityVerify?: IIdentity;
  introVideo?: string;
  verified: boolean;
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
  ratings: [IRating];
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
  role: string | null;
  dob: string;
  gender: string;
  clients: string[];
  responseTimes: number[];
  currentlyHiredBy: string;
  averageResponseTime: number;
  updateSamples(
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
  serviceType: string;
  image: string;
  description: string;
}
