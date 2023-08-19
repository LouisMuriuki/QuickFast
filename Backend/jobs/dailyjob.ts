import Package from "../mongo/models/PackageSchema.ts";
import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  // This function will run every day at midnight
  try {
    const packages = await Package.find({});

    for (const pack of packages) {
      if (pack.days > 0) {
        pack.days -= 1;
        await pack.save();
      }
    }
    console.log("Daily job completed");
  } catch (error) {
    console.error("Error in daily job:", error);
  }
});
