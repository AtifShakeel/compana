import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    default: "USD",
  },

  duration: {
    type: Number, // duration in days
    required: true,
  },

  features: [
    {
      type: String, 
    },
  ],

  isActive: {
    type: Boolean,
    default: true,
  },

}, { timestamps: true });

export const Plan = mongoose.model("Plan", planSchema);