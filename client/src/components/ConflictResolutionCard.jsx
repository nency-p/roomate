import React, { useEffect, useState } from "react";

const ConflictResolutionCard = ({ userA, userB }) => {
  const [conflictData, setConflictData] = useState(null);

  useEffect(() => {
    // Simulated backend fetch (replace with actual API later)
    const fetchConflictTips = async () => {
      // Simulate API call
      const response = {
        potentialConflict: "Late-night noise vs early sleeper",
        tips: ["Use headphones", "Respect quiet hours"]
      };
      setConflictData(response);
    };

    fetchConflictTips();
  }, [userA, userB]);

  if (!conflictData) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto mt-6 shadow">
      <h2 className="text-xl font-semibold text-red-600 mb-3">⚠️ Conflict Resolution Tips</h2>
      <p className="text-sm text-gray-700 mb-2">
        <strong>Potential Conflict:</strong> {conflictData.potentialConflict}
      </p>
      <ul className="list-disc list-inside text-sm text-gray-800">
        {conflictData.tips.map((tip, index) => (
          <li key={index}>💡 {tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConflictResolutionCard;
