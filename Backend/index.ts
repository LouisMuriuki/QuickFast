import Connect from "./mongo/Connect.js";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import authRoute from "./routes/authRoute.ts";
import clientRoute from "./routes/clientRoute.ts";
import userRoute from "./routes/userRoute.ts";
import invoiceRoute from "./routes/invoiceRoute.ts";
import tokenRoute from "./routes/tokenRoute.ts";
import settingsRoute from "./routes/settingsRoute.ts";
import estimateRoute from "./routes/estimateRoute.ts";
import packageRoute from "./routes/packageRoute.ts";
import emailRoute from "./routes/emailRoute.ts";
import paymentRoute from "./routes/paymentRoute.ts";
import hooksRoute from "./routes/hooksRoute.ts";
import './jobs/dailyjob.ts'
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
// this hook has to be called before the express.json otherwise will fail
app.use("/fastinvoice/api/v1/hooks", hooksRoute);
app.use(express.json({ limit: "50mb" }));
app.use("/fastinvoice/api/v1/auth", authRoute);
app.use("/fastinvoice/api/v1/client", clientRoute);
app.use("/fastinvoice/api/v1/users", userRoute);
app.use("/fastinvoice/api/v1/estimate", estimateRoute);
app.use("/fastinvoice/api/v1/invoice", invoiceRoute);
app.use("/fastinvoice/api/v1/token", tokenRoute);
app.use("/fastinvoice/api/v1/settings", settingsRoute);
app.use("/fastinvoice/api/v1/packages", packageRoute);
app.use("/fastinvoice/api/v1/emails", emailRoute);
app.use("/fastinvoice/api/v1/subscription", paymentRoute);


const StartServer = () => {
  try {
    Connect(process.env.MONGO_URL);
    app.listen(5000, () => {
      console.log("server is up");
    });
  } catch (error) {
    console.log(error);
  }
};

StartServer();
