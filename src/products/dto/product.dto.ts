import { ReviewSchema } from '../schemas/review.schema';

export class ProductDto {
  readonly name: string;
  readonly description: string;
  readonly ingredients: [string];
  readonly price: number;
  readonly category: string;
  readonly discountPercentage?: number;
  readonly rating?: number;
  readonly voteAmount?: number;
  readonly variant?: number;
  readonly point?: number;
  readonly image?: string;
  readonly reviews?: [typeof ReviewSchema];
  readonly createdAt?: Date;
}
