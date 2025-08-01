const express = require("express");
const router = express.Router();

const sampleData = [
  {
    name: "Nency Patel",
    match: "Disha Shah",
    score: 88,
    room: "Room A-101",
    timestamp: "2025-07-30 15:24"
  },
  {
    name: "Ravi Kumar",
    match: "Aryan Jain",
    score: 63,
    room: "Room B-206",
    timestamp: "2025-07-30 15:32"
  }
];

router.get("/data", (req, res) => {
  res.json(sampleData);
});

module.exports = router;
