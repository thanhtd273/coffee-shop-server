import * as mongoose from 'mongoose';
import { ReviewSchema } from './review.schema';

export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    // maxLength: [
    //   20,
    //   "A product'name must have less or equal than 10 characters",
    // ],
    // unique: [true, 'A product must have a unique name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A product must have the description for customers'],
    minLength: [
      10,
      'The description must have greater or equal than 10 characters',
    ],
    unique: [true, 'The description must have no same to others'],
  },
  ingredients: {
    type: [String],
    required: [true, 'A product must have ingredients'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  category: {
    type: String,
    required: [true, 'A product must have category'],
  },
  discountPercentage: {
    type: Number,
    min: [0, 'A percentage must greater or equal than 0'],
    max: [1, 'A percentage must have less or equal than 1'],
    default: 0,
  },
  rating: {
    type: Number,
    max: [5, 'A rating must have less or equal than 5'],
    default: 0,
  },
  voteAmount: {
    type: Number,
    default: 0,
  },
  variant: {
    type: String,
    default: '',
  },
  point: {
    type: Number,
    min: [0, 'The point must have greater or equal than 0'],
    max: [100, `The point must have less or equal than 100`],
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  reviews: {
    type: [ReviewSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
    // select: false,
  },
});
