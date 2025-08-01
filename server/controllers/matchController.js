const getMatchFromGPT = require("../utils/gptMatch");
const assignRoom = require("../utils/assignRoom");
const Match = require("../models/Match");
const User = require("../models/User");

exports.matchUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const newUser = await User.findById(userId).lean();
    const otherUsers = await User.find({ _id: { $ne: userId } }).lean();

    if (!newUser || otherUsers.length === 0) {
      const fallbackMatch = new Match({
        userId,
        userName: newUser?.name,
        matchName: "No match available",
        score: 0,
        reason: "No other users found",
        assignedRoom: null,
      });
      await fallbackMatch.save();
      return res.json({ message: "No match found", match: fallbackMatch });
    }

    const { matchName, score, reason } = await getMatchFromGPT(newUser, otherUsers);

    const roomResult = await assignRoom(userId, newUser.name, matchName);

    const newMatch = new Match({
      userId,
      userName: newUser.name,
      matchName,
      score,
      reason,
      assignedRoom: roomResult.assignedRoom,
    });

    await newMatch.save();

    res.json({ message: "Match + Room assigned", match: newMatch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Matching failed" });
  }
};
