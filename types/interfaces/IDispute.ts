export interface IDispute extends Document {
  created?: Date;
  updated?: Date;
  status?: string;
  description: string;
  resolution?: string;
  parties: {
    complainant: string; // The user raising the dispute
    defendant: string; // The user against whom the dispute is raised
  };
  disputeType: string;
  contract: string; // The contract related to the dispute
}
