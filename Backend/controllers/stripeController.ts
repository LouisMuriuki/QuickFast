import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import StripePayment from "../mongo/models/stripepaymentschema.ts";
import User from "../mongo/models/UserSchema.ts";
import {
  setownerID,
  setpackageID,
  getownerID,
  getpackageID,
} from "../utils/memoryStorage.ts";
interface StripePayment {
  ownerId: string;
  amount: number;
  amount_received: number;
  created: number;
  currency: string;
  customer: string;
  id: string;
  payment_method: string;
  status: string;
}

const stripe = new Stripe(process.env.STRIPESECRET, {
  apiVersion: "2022-11-15",
});

const recievePaymentRequest = async (
  req: { body: { ownerId: any; packageId: any; packagename: string } },
  res: any
) => {
  let priceid;
  const { ownerId, packageId, packagename } = req.body;
  console.log(packagename);
  setpackageID(packageId);
  setownerID(ownerId);
  console.log(req.body);
  const basicprice = "price_1NgorsD9wPjxIqyfJKP3zWci";
  const premiumplan = "price_1NgouWD9wPjxIqyfpyAfBBtd";
  const executiveplan = "price_1NgotpD9wPjxIqyfgT8vAOjK";
  switch (packagename) {
    case "Basic":
      priceid = basicprice;
      break;
    case "Premium":
      priceid = premiumplan;
      break;
    case "Executive":
      priceid = executiveplan;
      break;
    default:
      priceid = basicprice;
      break;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceid, quantity: 1 }],
      success_url: `${process.env.DOMAINURL}/subscription?successfulpayment=true`,
      cancel_url: `${process.env.DOMAINURL}/subscription?successfulpayment=false`,
    });
    return res.status(200).json({ status: 200, url: session.url });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, success: false });
  }
};
const successfulCheckout = async (req: any, res: any) => {
  const signingsecret =
    "whsec_6c879fe2e09b5e0aa791bb7c1472056d1c9c4cdebcd3b9a9da311457f9642173";
  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, signingsecret)
  } catch (error) {
    console.log("here", error.message);
    res.status(400).json({ sucess: false });
  }
  console.log(event.data.object);
  const ownerID = getownerID();
  const packageID = getpackageID();

  const paymentIntentSucceeded = event.data.object as Stripe.Charge; 
  console.log(event.type)
  console.log(paymentIntentSucceeded)
  switch (event.type) {
    case "payment_intent.succeeded":
      await StripePayment.create({
        ownerId: ownerID,
        amount: paymentIntentSucceeded.amount / 100,
        // @ts-expect-error
        amount_received: paymentIntentSucceeded.amount_received / 100,
        created: paymentIntentSucceeded.created,
        currency: paymentIntentSucceeded.currency,
        customer: paymentIntentSucceeded.customer,
        id: paymentIntentSucceeded.id,
        payment_method: paymentIntentSucceeded.payment_method,
        status: paymentIntentSucceeded.status,
        invoice: paymentIntentSucceeded.invoice,
        // @ts-expect-error
        latest_charge: paymentIntentSucceeded.latest_charge,
      });

      const updateduser = await User.findById(ownerID);
      const body = {
        packageId: packageID,
        days: 30,
        totalbilled: (updateduser.totalbilled +=
          paymentIntentSucceeded.amount / 100),
      };
      if (updateduser) {
        updateduser.packageId = body.packageId;
        updateduser.days = body.days;
        updateduser.totalbilled = body.totalbilled;
        try {
          const savedUser = await updateduser.save();
          console.log("User updated:", savedUser);
        } catch (error) {
          console.error("Error updating user:", error);
        }
      } else {
        console.log("User not found");
      }

      break;
    case "payment_intent.payment_failed":
      await StripePayment.create({
        ownerId: ownerID,
        amount: paymentIntentSucceeded.amount,
        // @ts-expect-error
        amount_received: paymentIntentSucceeded.amount_received,
        created: paymentIntentSucceeded.created,
        currency: paymentIntentSucceeded.currency,
        customer: paymentIntentSucceeded.customer,
        id: paymentIntentSucceeded.id,
        payment_method: paymentIntentSucceeded.payment_method,
        status: paymentIntentSucceeded.status,
        invoice: paymentIntentSucceeded.invoice,
        // @ts-expect-error
        latest_charge: paymentIntentSucceeded.latest_charge,
      });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};
export { recievePaymentRequest, successfulCheckout };
