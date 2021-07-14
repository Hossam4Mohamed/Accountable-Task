import { Schema, model, Types } from 'mongoose';

const TaskSchema = new Schema(
  {
    success: { type: Boolean },
    reasonOfFailure: { type: String },
    accountId: { type: Types.ObjectId, ref: 'Account' },
  },
  { timestamps: true }
);

const taskModel = model('Task', TaskSchema);

export default taskModel;
