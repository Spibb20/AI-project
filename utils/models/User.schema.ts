import mongoose, { Schema } from "mongoose";

type User = {
  id: string;
  name: string;
  age: number;
};

const UserSchema = new Schema({
  name: String,
  age: Number,
});

export const User =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

User.create();
