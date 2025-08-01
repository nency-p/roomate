require("dotenv").config(); 
const mongoose = require("mongoose");
const Room = require("../models/Room");

console.log("Connecting to:", process.env.MONGO_URI);
// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to DB");
 
const seedRooms = async () => {
  await Room.deleteMany(); // Clear existing

  const rooms = [
    {
      roomNumber: "A101",
      type: "twin",
      floorLevel: 1,
      hasWindow: true,
      hasBalcony: false,
      occupants: [],
      maxOccupancy: 2,
      isAvailable: true,
    },
    {
      roomNumber: "A102",
      type: "twin",
      floorLevel: 1,
      hasWindow: false,
      hasBalcony: true,
      occupants: [],
      maxOccupancy: 2,
      isAvailable: true,
    },
    {
      roomNumber: "B201",
      type: "single",
      floorLevel: 2,
      hasWindow: true,
      hasBalcony: true,
      occupants: [],
      maxOccupancy: 1,
      isAvailable: true,
    },
    {
      roomNumber: "B202",
      type: "single",
      floorLevel: 2,
      hasWindow: false,
      hasBalcony: false,
      occupants: [],
      maxOccupancy: 1,
      isAvailable: true,
    },
    {
      roomNumber: "C301",
      type: "single",
      floorLevel: 3,
      hasWindow: true,
      hasBalcony: false,
      occupants: [],
      maxOccupancy: 1,
      isAvailable: true,
    },
  ];

  await Room.insertMany(rooms);
  console.log("✅ Rooms seeded successfully");
  mongoose.connection.close();
};

seedRooms();
})
.catch((err) => console.error("❌ DB Connection Error:", err));