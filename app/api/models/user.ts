import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  createdAt: Date;
  promptHistory: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    promptHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Prompt",
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const User = models.User || model<IUser>("User", userSchema);
