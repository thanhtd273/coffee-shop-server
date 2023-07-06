import NotificationSchema from '../schemas/notification.schema';
import OrderSchema from '../schemas/order.schema';

export class UserDto {
  readonly name: string;
  readonly mail: string;
  readonly password?: string;
  readonly passwordConfirm?: string;

  readonly phone?: string;
  readonly role?: string;
  readonly location?: typeof Map;
  readonly avatar?: string;
  readonly createdAt?: Date;
  readonly cart?: typeof OrderSchema;
  readonly favorites?: string[];
  readonly notifications?: (typeof NotificationSchema)[];
  readonly passwordChangedAt?: Date;
  readonly passwordResetExpires?: Date;
  readonly passwordResetCode?: String;
}
