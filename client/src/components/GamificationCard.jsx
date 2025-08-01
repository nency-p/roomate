import React from "react";

const GamificationCard = ({ score, cleanlinessCount }) => {
  const isHighlyCompatible = score > 85;
  const hasCleanStreak = cleanlinessCount >= 3;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-center text-indigo-600">🎮 Gamification</h2>

      {isHighlyCompatible && (
        <div className="flex items-center justify-between bg-green-100 border border-green-300 text-green-800 rounded-xl px-4 py-2 mb-4">
          <span className="text-lg font-medium">💚 Highly Compatible</span>
          <span className="text-sm font-semibold">Score: {score}</span>
        </div>
      )}

      {hasCleanStreak && (
        <div className="bg-blue-100 border border-blue-300 text-blue-800 rounded-xl px-4 py-2 mb-4">
          🌟 Cleanliness Streak: You reported high cleanliness 3+ times!
        </div>
      )}

      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl px-4 py-2 mb-4">
        📩 <button className="underline hover:text-yellow-600">Refer a roommate</button> and earn rewards!
      </div>

      <div className="bg-gray-100 border border-gray-300 text-gray-700 rounded-xl px-4 py-2">
        🗣️ Community Contributions (coming soon): Positive reviews and feedback will appear here.
      </div>
    </div>
  );
};

export default GamificationCard;
