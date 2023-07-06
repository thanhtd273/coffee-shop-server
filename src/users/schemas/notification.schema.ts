import * as mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: [30, 'A title must be less or equal than 30'],
    required: [true, 'A notification must have title'],
  },
  body: {
    type: String,
    maxLength: [100, 'The body of notification must be less or equal than 100'],
    required: [true, 'A notification must have body'],
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
  data: {
    type: Object,
    default: {},
  },
  isReaded: {
    type: Boolean,
    default: false,
  },
});

export default NotificationSchema;
// module.exports =
