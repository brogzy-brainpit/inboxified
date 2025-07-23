const mongoose = require("mongoose");

const campaignContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: { type: String, default: "null" },
  phone: { type: String, default: "null" },
  website: { type: String, default: "null" },
  state: { type: String, default: "null" },
  status: { type: String, default: "active" },
  condition: { type: String, default: "unverified" },
  signUpSource: String,
  opened: { type: Boolean, default: false },
  clicked: { type: Boolean, default: false },
  openAt: { type: Date },
  clickAt: { type: Date },
  clickedLinks:{type:Array,default:[]}
});

const trackSchema = new mongoose.Schema({
  campaign: { type: String },
  trackingUser: {
    type: String,
    required: [true, "please trackingUser"],
  },
  trackerId: { type: String },
  createdAt: { type: Date, default: Date.now },
  opens: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  totalSubscribers: [campaignContactSchema],
  stats: [
    {
      type: {
        type: String, // open | click
      },
      date: { type: Date, default: Date.now },
      emailClients: String,
      devices: {
        type: {
          type: String,
        },
        os: String,
      },
    },
  ],
});

module.exports = mongoose.model("Campaigns", trackSchema);
