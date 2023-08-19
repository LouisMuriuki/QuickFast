import mongoose from "mongoose";

const stripePaymentSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    amount_received: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
    },
    payment_method: {
      type: String,
    },
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    created: {
      type: Date,
    },
    customer: { type: String },
  },
);

const StripePayment = mongoose.model("StripePayment", stripePaymentSchema);

export default StripePayment;
