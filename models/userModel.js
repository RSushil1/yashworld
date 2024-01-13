import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    devices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "devices", // Assuming the model for devices is named "Device"
      },
    ],
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);

