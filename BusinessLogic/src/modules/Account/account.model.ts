import { Schema, model, Types } from 'mongoose';

const AccountSchema = new Schema(
  {
    account: { type: String, required: true, unique: true },
    bankName: { type: String },
    userId: { type: Types.ObjectId, ref: 'User' },
    bankAccessToken: { type: String, hide: true },
    intervalFetching: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const accountModel = model('Account', AccountSchema);

export default accountModel;
