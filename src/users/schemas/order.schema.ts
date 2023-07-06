import * as mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  // productId: {
  //   type: String,
  //   // required: [true, "An order must have a productId"],
  // },
  name: {
    type: String,
    required: [true, 'An  order must have a name'],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    default: 'ordering',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default OrderSchema;
