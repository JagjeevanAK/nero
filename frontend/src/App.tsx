import { useEffect } from "react";
import RegistrationSection from "./components/RegistrationSection";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import GroupDiscussionDetails from "./events/GroupDiscussionDetails";
import BGMIDetails from "./events/BGMIDetails";
import LinuxQuizDetails from "./events/LinuxQuizDetails";
import TechnicalMarathonDetails from "./events/TechnicalMarathonDetails";
import EventsSection from "./components/EventsSection";
import HeroSection from "./components/HeroSection";
import NeuroverseMainEventDetails from "./components/NeuroverseMainEventDetails";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "";
  }, []);

  return (
    <div className="min-h-screen theme-bg theme-text">
      <HeroSection />
      <NeuroverseMainEventDetails />
      <EventsSection
        onGDMoreDetails={() => navigate("/gd-rules")}
        onBGMIMoreDetails={() => navigate("/BGMI-rules")}
        onLinuxMoreDetails={() => navigate("/linux-rules")}
        onTechMarathonMoreDetails={() => navigate("/technical-marathon")}
      />
      <RegistrationSection />
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gd-rules" element={<GroupDiscussionDetails />} />
        <Route path="/BGMI-rules" element={<BGMIDetails />} />
        <Route path="/linux-rules" element={<LinuxQuizDetails />} />
        <Route
          path="/technical-marathon"
          element={<TechnicalMarathonDetails />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
