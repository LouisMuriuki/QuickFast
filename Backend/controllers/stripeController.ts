import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPESECRET, {
  apiVersion: "2022-11-15",
});

const recievePaymentRequest = async(
  req: { body: { ownerid: any; packageId: any; packagename: string } },
  res: any
) => {
  let priceid;
  const { ownerid, packageId, packagename } = req.body;
  console.log(req.body.packagename);
  const basicprice = "price_1Nc38bD9wPjxIqyfMHuIllvQ";
  const premiumplan = "price_1Nc39kD9wPjxIqyf4z4bqfVJ";
  const executiveplan = "price_1Nc3A5D9wPjxIqyfyMk12cbL";
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
    return res.status(200).json({status:200,url:session.url})
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, success: false });
  }
};
export { recievePaymentRequest };
