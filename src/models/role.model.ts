import { Schema, Document, model } from "mongoose";

export interface IRole extends Document {
  name: string;
  description: string;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model<IRole>("Role", roleSchema);
