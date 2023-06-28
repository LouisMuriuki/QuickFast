import Connect from "./mongo/Connect.js";
import express from "express";
import cors from "cors"
import * as dotenv from "dotenv"
import authRoute from "./routes/authRoute.ts"
import clientRoute from "./routes/clientRoute.ts"
import userRoute from "./routes/userRoute.ts"
import invoiceRoute from "./routes/invoiceRoute.ts"
import tokenRoute from "./routes/tokenRoute.ts"
import estimateRoute from "./routes/estimateRoute.ts"
dotenv.config()
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json({ limit: "50mb" }));

app.use("/fastinvoice/api/v1/auth",authRoute);
app.use("/fastinvoice/api/v1/client",clientRoute);
app.use("/fastinvoice/api/v1/users",userRoute);
app.use("/fastinvoice/api/v1/estimate",estimateRoute);
app.use("/fastinvoice/api/v1/invoice",invoiceRoute);
app.use("/fastinvoice/api/v1/token",tokenRoute);

const StartServer = () => {
  try {
    Connect(process.env.MONGO_URL);
    app.listen(5000, () => {
      console.log("server is up");
    });
  } catch (error) {
    console.log(error)
  }
};

StartServer()
