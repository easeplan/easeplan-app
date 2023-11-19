export type IEvent = {
  _id?: number;
  budget: number;
  type: string;
  state: string;
  serviceRequested: string;
  date: Date;
};

export type IEventDTO = {
  budget: number;
  type: string;
  state: string;
  owner: object;
  date: Date;
  selectedServices: string[];
};
