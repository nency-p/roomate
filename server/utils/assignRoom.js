// ✅ utils/assignRoom.js
const Room = require("../models/Room");
const User = require("../models/User");

function scoreRoom(room, preferences) {
  let score = 0;
  if (preferences?.window === "yes" && room.hasWindow) score += 1;
  if (preferences?.balcony === "yes" && room.hasBalcony) score += 1;

  if (
    preferences?.preferredFloorLevel &&
    preferences.preferredFloorLevel !== "any" &&
    parseInt(preferences.preferredFloorLevel) === room.floorLevel
  ) {
    score += 1;
  }
  return score;
}

async function assignRoom(userId, userName, matchName) {
  const user = await User.findById(userId);
  const matchUser = await User.findOne({ name: matchName });

  if (!user || !matchUser) return { assignedRoom: null, type: "none" };

  // 🔍 1. Check if match is already in a twin-sharing room
  const twinRooms = await Room.find({
    type: "twin",
    "occupants.name": matchName,
    $expr: { $lt: [{ $size: "$occupants" }, 2] },
  });

  let bestTwinRoom = null;
  let bestTwinScore = -1;

  for (const room of twinRooms) {
    const score =
      scoreRoom(room, user.roomPreferences) +
      scoreRoom(room, matchUser.roomPreferences);
    if (score > bestTwinScore) {
      bestTwinScore = score;
      bestTwinRoom = room;
    }
  }

  if (bestTwinRoom) {
    bestTwinRoom.occupants.push({ userId, name: userName });
    if (bestTwinRoom.occupants.length === bestTwinRoom.maxOccupancy)
      bestTwinRoom.isAvailable = false;
    await bestTwinRoom.save();

    user.assignedRoom = {
      roomNumber: bestTwinRoom.roomNumber,
      type: bestTwinRoom.type,
      matchName: matchUser.name,
    };
    await user.save();

    return {
      assignedRoom: bestTwinRoom.roomNumber,
      type: "twin",
      score: bestTwinScore,
    };
  }

  // 🔍 2. Assign best single room
  const singleRooms = await Room.find({
    type: "single",
    isAvailable: true,
  });

  let bestSingleRoom = null;
  let bestScore = -1;

  for (const room of singleRooms) {
    const score = scoreRoom(room, user.roomPreferences);
    if (score > bestScore) {
      bestScore = score;
      bestSingleRoom = room;
    }
  }

  if (bestSingleRoom) {
    bestSingleRoom.occupants.push({ userId, name: userName });
    bestSingleRoom.isAvailable = false;
    await bestSingleRoom.save();

    user.assignedRoom = {
      roomNumber: bestSingleRoom.roomNumber,
      type: bestSingleRoom.type,
      matchName: null,
    };
    await user.save();

    return {
      assignedRoom: bestSingleRoom.roomNumber,
      type: "single",
      score: bestScore,
    };
  }

  // 😢 No rooms available
  return { assignedRoom: null, type: "none", score: 0 };
}

module.exports = assignRoom;
