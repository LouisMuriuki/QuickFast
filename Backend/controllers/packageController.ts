import Package from "../mongo/models/PackageSchema.ts";

const savePackages = async (req: any, res: any) => {
  try {
    const packages = [
      {
        packageName: "Free",
        features: [
          "Unlimited invoices",
          "Unlimited estimates",
          "Any device support",
          "Data visualization and dashboard",
          "Auto-save and fill clients' details",
          "View previous estimates and invoices",
          "Edit previous estimates",
          "Email & chat support",
          "Add Logo",
          "Due date reminders",
          "Ratings & reviews",
          "Priority queue",
          "Watermarks",
          "Send invoices and estimates via email",
        ],
        price: 0,
        maxinvoices: 10,
      },
      {
        packageName: "Basic",
        features: [
          "Up to 5 invoices",
          "Up to 20 estimates",
          "Any device support",
          "Auto-save and fill clients' details",
          "View previous estimates and invoices",
          "Email & chat support",
          "Add Logo",
        ],
        price: 1,
        maxinvoices: 5,
      },
      {
        packageName: "Premium",
        features: [
          "Up to 15 invoices",
          "Unlimited estimates",
          "Any device support",
          "Data visualization and dashboard",
          "Auto-save and fill clients' details",
          "View previous estimates and invoices",
          "Edit previous estimates",
          "Email & chat support",
          "Add Logo",
          "Due date reminders",
          "Ratings & reviews",
          "Priority queue",
          "Watermarks",
          "Send invoices and estimates via email",
        ],
        price: 1.5,
        maxinvoices: 10,
      },
      {
        packageName: "Executive",
        features: [
          "Unlimited invoices",
          "Unlimited estimates",
          "Any device support",
          "Data visualization and dashboard",
          "Auto-save and fill clients' details",
          "View previous estimates and invoices",
          "Edit previous estimates",
          "Email & chat support",
          "Add Logo",
          "Due date reminders",
          "Ratings & reviews",
          "Priority queue",
          "Watermarks",
          "Send invoices and estimates via email",
        ],
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
    res.status(200).json({ status: 200, data: newpackage, success: true });
  } catch (error) {
    console.log(error.message, "here");
    res.status(500).json({ status: 500, error: error.message, success: false });
  }
};

const getPackages = async (req: any, res: any) => {
  const { all } = req.query;
  if (all) {
    try {
      const existingPackages = await Package.find({});
      res
        .status(200)
        .json({ status: 200, data: existingPackages, success: true });
    } catch (error) {
      res
        .status(500)
        .json({ status: 500, error: error.message, success: false });
    }
  }
};

export { getPackages, savePackages };
