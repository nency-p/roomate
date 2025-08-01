import SurveyForm from "../components/SurveyForm";

const SurveyPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-gray-300 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-800">📝 Roommate Preference Survey</h1>
        
        <p className="text-sm text-gray-500">
          🎙️ You can speak your answers into the voice widget (Omnidim) — or fill out the form manually below.
        </p>

        <div className="border-t pt-4">
          <SurveyForm />
        </div>

        <div className="text-xs text-gray-400">
          Your responses help us match you with the best possible roommate using AI.
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
