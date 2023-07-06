import { ReviewSchema } from '../schemas/review.schema';

export interface Product {
  name: string;
  description: string;
  ingredients: [string];
  price: number;
  category: string;
  discountPercentage?: number;
  rating?: number;
  voteAmount?: number;
  variant?: number;
  point?: number;
  image?: string;
  reviews?: [typeof ReviewSchema];
  createdAt?: Date;
}
