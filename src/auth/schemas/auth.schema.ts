import * as mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema({
  email: String,
  password: String,
  passwordConfirm: String,
});

export default AuthSchema;
