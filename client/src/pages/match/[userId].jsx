import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const MatchPage = () => {
  const { userId } = useRouter().query;
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    if (!userId) return;

    axios.post("/api/match", { userId })
      .then(res => setMatchData(res.data))
      .catch(() => alert("Failed to fetch match."));
  }, [userId]);

  if (!matchData) return <div className="text-center mt-10">⏳ Finding your best match...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">🎯 Match Result</h2>
      <p><strong>Match:</strong> {matchData.match}</p>
      <p><strong>Score:</strong> {matchData.score}</p>
      <p><strong>Reason:</strong> {matchData.reason}</p>
      <p><strong>Assigned Room:</strong> {matchData.room || "To be assigned"}</p>
      <a href="/result" className="mt-4 inline-block text-blue-600 underline">View Result Page</a>
    </div>
  );
};

export default MatchPage;
