import { useEffect } from "react";
import RegistrationSection from "./components/RegistrationSection";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import BGMIDetails from "./events/BGMIDetails";
import LinuxQuizDetails from "./events/LinuxQuizDetails";
import CodeMarathonDetails from "./events/CodeMarathonDetails";
import PromptWarDetails from "./events/PromptWarDetails";
import BoxCricketDetails from "./events/BoxCricketDetails";
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
        onBGMIMoreDetails={() => navigate("/BGMI-rules")}
        onLinuxMoreDetails={() => navigate("/linux-rules")}
        onCodeMarathonMoreDetails={() => navigate("/code-marathon")}
        onPromptWarMoreDetails={() => navigate("/prompt-war")}
        onBoxCricketMoreDetails={() => navigate("/box-cricket")}
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
        <Route path="/BGMI-rules" element={<BGMIDetails />} />
        <Route path="/linux-rules" element={<LinuxQuizDetails />} />
        <Route path="/code-marathon" element={<CodeMarathonDetails />} />
        <Route path="/prompt-war" element={<PromptWarDetails />} />
        <Route path="/box-cricket" element={<BoxCricketDetails />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
