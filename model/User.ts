import mongoose, { Schema, Document } from "mongoose";
interface User extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "User Name must have at least 3 characters"],
      match: [
        /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        "User Name must contain only letters and spaces",
      ],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;
