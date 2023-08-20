
import cron from "node-cron";
import User from "../mongo/models/UserSchema.ts";

cron.schedule("0 0 * * *", async () => {
  // This function will run every day at midnight
  try {
    const users = await User.find({});
    for (const user of users) {
      if (user.days > 0) {
        user.days -= 1;
        await user.save();
      }
    }
    console.log("Daily job completed");
  } catch (error) {
    console.error("Error in daily job:", error);
  }
});
