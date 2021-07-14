import { Schema, model } from 'mongoose';

import mongooseHidden from 'mongoose-hidden';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'USER', hide: true },
    name: { type: String },
  },
  { timestamps: true }
);

UserSchema.plugin(mongooseHidden({ defaultHidden: { _id: false } }));

const userModel = model('User', UserSchema);

export default userModel;
