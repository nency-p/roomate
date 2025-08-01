const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  type: {
    type: String,
    enum: ["single", "twin"],
    required: true,
  },
  occupants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
    },
  ],
  maxOccupancy: { type: Number, default: 1 },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  // Preference-related traits
  floorLevel: Number,
  hasWindow: Boolean,
  hasBalcony: Boolean,
});

module.exports = mongoose.model("Room", roomSchema);
