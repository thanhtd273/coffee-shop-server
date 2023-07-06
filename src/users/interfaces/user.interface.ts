import NotificationSchema from '../schemas/notification.schema';
import OrderSchema from '../schemas/order.schema';

export interface User {
  name: string;
  mail: string;
  password?: string;
  passwordConfirm?: string;
  phone?: string;
  role?: string;
  location?: typeof Map;
  avatar?: string;
  createdAt?: Date;
  cart?: typeof OrderSchema;
  favorites?: string[];
  notifications?: (typeof NotificationSchema)[];
  passwordChangedAt?: Date;
  passwordResetExpires?: Date;
  passwordResetToken?: String;
  correctPassword?: (
    candidatePassword: string,
    password: string,
  ) => Promise<boolean>;
  createPasswordResetToken?: () => string;
  changePasswordAfter?: (JWTTimestamp: Date) => boolean;
}
