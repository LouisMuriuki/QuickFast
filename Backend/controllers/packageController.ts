import Package from "../mongo/models/PackageSchema.ts";

const savePackages = async (req: any, res: any) => {
  try {
    const packages = [
      {
        packageName: "Free",
        features: [""],
        price: 0,
        maxinvoices: 10,
      },
      {
        packageName: "Basic",
        features: [""],
        price: 1,
        maxinvoices: 5,
      },
      {
        packageName: "Premium",
        features: [""],
        price: 1.5,
        maxinvoices: 10,
      },
      {
        packageName: "Executive",
        features: [""],
        price: 2,
        maxinvoices: 100,
      },
    ];
    let newpackage;
    if (packages && packages.length) {
      for (const item of packages) {
        const existingpackage = await Package.findOne({
          packageName: item.packageName,
        });
        if (!existingpackage) {
          newpackage = await Package.create({
            packageName: item.packageName,
            features: item.features,
            price: item.price,
            maxInvoices: item.maxinvoices,
          });
          console.log("Packages created successfully");
        }
      }
    }
    res.status(200).json({ status: 200, data: newpackage, sucess: true });
  } catch (error) {
    console.log(error.message, "here");
    res.status(500).json({ status: 500, error: error.message, sucess: false });
  }
};

const getPackages = async (req: any, res: any) => {
  try {
    const existingPackages = await Package.find({});
    res
      .status(200)
      .json({ status: 200, data: existingPackages, success: true });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, success: false });
  }
};

export { getPackages, savePackages };
