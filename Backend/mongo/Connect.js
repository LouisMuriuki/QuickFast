import mongoose from "mongoose";

const Connect = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("coonected"))
    .catch((err) => console.log(err));
};
export default Connect;
