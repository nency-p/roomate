const express = require("express");
const router = express.Router();
const assignRoom = require("../utils/assignRoom");

router.post("/:userId", async (req, res) => {
  const { userName, matchName } = req.body;
  const { userId } = req.params;

  try {
    const result = await assignRoom(userId, userName, matchName);
    res.json(result);
  } catch (err) {
    console.error("Room assignment failed:", err);
    res.status(500).json({ error: "Room assignment failed" });
  }
});

module.exports = router;
