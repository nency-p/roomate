import React from "react";

const getScoreBadge = (score) => {
  if (score >= 80) return { label: "High", color: "bg-green-100 text-green-700 border-green-300" };
  if (score >= 50) return { label: "Medium", color: "bg-yellow-100 text-yellow-700 border-yellow-300" };
  return { label: "Low", color: "bg-red-100 text-red-700 border-red-300" };
};

const MatchResult = ({ matchName, score, explanation, room }) => {
  const { label, color } = getScoreBadge(score);

  const handleDownload = () => {
    const content = `Match: ${matchName}\nScore: ${score} (${label})\nRoom: ${room}\nExplanation: ${explanation}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "match_result.txt";
    link.click();
  };

  const handleShare = async () => {
    const message = `🎯 Match Result\nName: ${matchName}\nScore: ${score} (${label})\nRoom: ${room}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Roommate Match Result", text: message });
      } catch (err) {
        alert("Sharing failed.");
      }
    } else {
      alert("Share API not supported.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 px-6 py-8 bg-white shadow-2xl rounded-2xl border">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">🎯 Your Match Result</h2>
      <div className="space-y-6">
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Match Name:</span>
          <span className="text-gray-900 font-semibold">{matchName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Score:</span>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${color}`}>
            {score} ({label})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-medium">Assigned Room:</span>
          <span className="text-gray-900 font-semibold">{room}</span>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Explanation:</p>
          <p className="text-gray-700 mt-2 text-sm leading-relaxed">{explanation}</p>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button onClick={handleShare} className="px-5 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all">
            Share
          </button>
          <button onClick={handleDownload} className="px-5 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchResult;
