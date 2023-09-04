import mongoose, { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
  status: number;
  phone_number: number;
  roles: string[];
  encrypPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      min: 6,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      max: 1,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    roles: [
      {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.encrypPassword = async function (
  password: string
): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
