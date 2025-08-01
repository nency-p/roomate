import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("/api/admin/data")
      .then((res) => setData(res.data))
      .catch(() => alert("Failed to load admin data."));
  }, []);

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.match.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ["Name", "Match", "Score", "Room", "Timestamp"];
    const rows = filtered.map(item => [item.name, item.match, item.score, item.room, item.timestamp]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "admin_data.csv";
    link.click();
  };

  // ---- MOCK DATA FOR CHARTS ---- //
  const roomOccupancyData = [
    { name: "Occupied", value: 75 },
    { name: "Vacant", value: 25 }
  ];

  const avgMatchData = [
    { name: "Week 1", avgScore: 76 },
    { name: "Week 2", avgScore: 81 },
    { name: "Week 3", avgScore: 88 }
  ];

  const traitsData = [
    { trait: "Clean", count: 40 },
    { trait: "Night Owl", count: 32 },
    { trait: "Quiet", count: 28 }
  ];

  const riskUsers = data.filter(u => u.score < 60 || u.match === "Unmatched");

  const COLORS = ["#34d399", "#f87171"];

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 space-y-10">
      {/* Title + Export */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h1>
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Export CSV
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by Name or Match..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg shadow-sm"
      />

      {/* Data Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-medium text-gray-600">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Match</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Room</th>
              <th className="px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filtered.map((user, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 font-semibold">{user.name}</td>
                <td className="px-4 py-2">{user.match}</td>
                <td className={`px-4 py-2 ${user.score >= 80 ? "text-green-600" : user.score >= 50 ? "text-yellow-600" : "text-red-600"}`}>{user.score}</td>
                <td className="px-4 py-2">{user.room}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{user.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Occupancy */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Room Occupancy</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={roomOccupancyData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {roomOccupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Average Match Score */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Average Match Score</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={avgMatchData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traits + Risk Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traits */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Top Recurring Traits</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={traitsData}>
              <XAxis dataKey="trait" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#fbbf24" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Users */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Risk Detection</h2>
          <table className="w-full table-auto text-left border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Score</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {riskUsers.map((user, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2 text-red-600 font-bold">{user.score}</td>
                  <td className="p-2 text-red-500">{user.match}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Finance Placeholder */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
        <p className="text-indigo-800 font-medium">💡 Finance Intelligence (Coming Soon):</p>
        <p className="text-sm text-gray-700 mt-1">Smart bill splitting and roommate expense tracking will be added soon.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
