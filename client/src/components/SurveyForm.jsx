import { useState, useEffect } from "react";
import RoomPreferenceForm from "./RoomPreferenceForm";
import axios from "axios";

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    cleanliness: '',
    sleepSchedule: '',
    guestPolicy: '',
    foodPreference: '',
    studyHabits: ''
  });

  useEffect(() => {
    
   try {
     window.handleOmnidimSurvey = (data) => {
       setFormData(data);
     };
   } catch (error) {
      console.error("Omnidim widget failed to initialize:", e);
   }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/users/preferences', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Preferences saved!');
    } catch (err) {
      console.error(err);
      alert('Error submitting preferences.');
    }
  };

  return (
     <>
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block capitalize text-sm mb-1">
            {key.replace(/([A-Z])/g, ' $1')}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit Preferences
      </button>

    </form>
    <RoomPreferenceForm />
   </>
  );
};

export default SurveyForm;
