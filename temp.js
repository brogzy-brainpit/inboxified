require("dotenv").config();
const mongoose = require("mongoose");
const Published = require("./model/templateAuth"); // adjust the path if needed

async function backfillFields() {
  await mongoose.connect(process.env.MONGODB_URI);

  const updated = await Published.updateMany(
    {},
    {
      $set: {
        public: true,
        tested: true,
      },
    }
  );

  console.log(`✅ Updated ${updated.modifiedCount} templates`);
  mongoose.disconnect();
}

backfillFields().catch(err => {
  console.error("❌ Error backfilling fields:", err);
  mongoose.disconnect();
});
