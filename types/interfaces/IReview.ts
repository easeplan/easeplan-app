export interface IReview {
  _id?: string;
  contract: string;
  profileId: string;
  ratedBy: string;
  stars: number;
  review: string;
}
