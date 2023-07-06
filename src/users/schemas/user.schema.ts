import * as mongoose from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import OrderSchema from './order.schema';
import NotificationSchema from './notification.schema';
import { NextFunction } from 'express';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!'],
    unique: true,
    maxLength: [30, 'A name must have less than or equal 30'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide an email'],
  },
  password: {
    type: String,
    required: [true, "Password shouldn't be empty"],
    minLength: [8, 'A password must have at least 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    minLength: [8, 'A password confirm must have at least 8 characters'],
    required: [true, 'Password confirm is empty'],
    select: false,
    validate: {
      validator: function (val: string) {
        return this.password === val;
      },
      message: 'Passwords are not the same',
    },
  },
  phone: {
    type: String,
    required: [true, 'A user must have phone'],
    unique: [true, 'A phone must be unique'],
    validate: {
      validator: function (val: string) {
        return val[0] === '0' && val.length === 10;
      },
      message: 'Invalid phone number',
    },
  },
  role: {
    type: String,
    default: 'USER',
  },
  location: {
    type: Map,
  },
  avatar: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: new Date(),
    select: false,
  },
  cart: {
    type: [OrderSchema],
    // default: [],
  },
  favorites: {
    type: [String],
    default: [],
  },
  notifications: {
    type: [NotificationSchema],
  },
  passwordChangedAt: Date,
  passwordResetExpires: Date,
  passwordResetCode: String,
});

UserSchema.pre('save', async function (next: NextFunction) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  password: string,
) {
  return await bcrypt.compare(candidatePassword, password);
};

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp: Date) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      `${this.passwordChangedAt.getTime() / 1000}`,
      10,
    );
    return JWTTimestamp.getTime() < changedTimestamp;
  }
  return false;
};

UserSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default UserSchema;
