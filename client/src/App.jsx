import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import SurveyPage from "./pages/SurveyPage";
import MatchResultPage from "./pages/MatchResultPage";
import Header from "./components/Header";

function AppLayout() {
  const location = useLocation();

  // ❌ Don't show Header on specific routes if needed (optional)
  const hideHeaderOn = ["/login"];
  const shouldHideHeader = hideHeaderOn.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/result" element={<MatchResultPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;