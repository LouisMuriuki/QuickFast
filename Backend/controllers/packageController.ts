import Package from "../mongo/models/PackageSchema.ts";

const createPackage = async (req: any, res: any) => {
  try {
    let packages: [
      {
        packageName: "Free";
        features: [];
        price: 0;
        maxinvoices: 10;
      },
      {
        packageName: "Basic";
        features: [];
        price: 1;
        maxinvoices: 5;
      },
      {
        packageName: "Premium";
        features: [];
        price: 1.5;
        maxinvoices: 10;
      },
      {
        packageName: "Executive";
        features: [];
        price: 2;
        maxinvoices: 100;
      }
    ];
    for (const item of packages) {
      const existingpackage = await Package.findOne({
        item,
      });
      if (!existingpackage) {
        const createdPackage = Package.create({
          packageName: item.packageName,
          features: item.features,
          price: item.price,
          maxInvoices: item.maxinvoices,
        });
        res.status(200).json({
          status: 200,
          message: "Packages created successfully",
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: error.code });
  }
};
