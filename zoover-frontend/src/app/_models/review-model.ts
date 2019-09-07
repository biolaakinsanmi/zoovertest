import { ratingsI, ParentIdI } from '../_interfaces/review-interfaces';

export class ReviewModel{
  parents: Array<ParentIdI>;
  id: string;
  traveledWith: string;
  entryDate: number;
  travelDate: number;
  ratings: ratingsI;
  titles: any;
  texts: any;
  user: string;
  locale: string;
  aspectRatingAvg: number;
}
