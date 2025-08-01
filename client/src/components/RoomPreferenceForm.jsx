import React, { useState,useEffect } from "react";
import axios from "axios";
import API from '../../api';

const RoomPreferenceForm = () => {
    const [userId, setUserId] = useState("");
        useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user._id) setUserId(user._id);
        }, []);

  const [formData, setFormData] = useState({
    window: "",
    preferredFloorLevel: "",
    balcony: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value, 
     
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     await API.put(`/users/${userId}/preferences`, {
  roomPreferences: {
    ...formData
  }
      });

      alert("✅ Room preferences saved!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save preferences.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Room Preferences</h2>

      {/* Window preference */}
      <div className="mb-4">
        <label className="block mb-1">Near a window?</label>
        {["yes", "no", "no preference"].map((val) => (
          <label key={val} className="mr-4">
            <input
              type="radio"
              name="window"
              value={val}
              checked={formData.window === val}
              onChange={handleChange}
              required
            />{" "}
            {val}
          </label>
        ))}
      </div>

      {/* Floor level */}
      <div className="mb-4">
        <label className="block mb-1">Preferred floor level</label>
        {["1", "2", "3", "any"].map((val) => (
          <label key={val} className="mr-4">
            <input
              type="radio"
              name="preferredFloorLevel"
              value={val}
              checked={formData.preferredFloorLevel === val}
              onChange={handleChange}
              required
            />{" "}
            {val}
          </label>
        ))}
      </div>

      {/* Balcony preference */}
      <div className="mb-4">
        <label className="block mb-1">Balcony preference</label>
        {["yes", "no", "no preference"].map((val) => (
          <label key={val} className="mr-4">
            <input
              type="radio"
              name="balcony"
              value={val}
              checked={formData.balcony === val}
              onChange={handleChange}
              required
            />{" "}
            {val}
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Preferences
      </button>
    </form>
  );
};

export default RoomPreferenceForm;
