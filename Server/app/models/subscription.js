import mongoose from "mongoose";    

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },

  startDate: {
    type: Date,
    default: Date.now,
  },

  endDate: {
    type: Date,
  },

  status: {
    type: String,
    enum: ["active", "expired", "cancelled"],
    default: "active",
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  amountPaid: {
    type: Number,
  },

  transactionId: {
    type: String, // from Stripe, JazzCash, etc.
  },

}, { timestamps: true });

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;