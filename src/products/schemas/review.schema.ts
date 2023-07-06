import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'A review must have author'],
  },
  content: {
    type: String,
    maxLength: [300, 'A review must have less or equal than 300'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
