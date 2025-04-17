import { useEffect } from 'react';
import RegistrationSection from './components/RegistrationSection';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GroupDiscussionDetails from './GroupDiscussionDetails';
import BoxCricketDetails from './BoxCricketDetails';
import LinuxQuizDetails from './LinuxQuizDetails';
import TechnicalMarathonDetails from './TechnicalMarathonDetails';
import EventsSection from './components/EventsSection';
import HeroSection from './components/HeroSection';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = '';
  }, []);

  return (
    <div className="min-h-screen theme-bg theme-text">
      <HeroSection />
      <EventsSection 
        onGDMoreDetails={() => navigate('/gd-rules')} 
        onBoxMoreDetails={() => navigate('/box-rules')} 
        onLinuxMoreDetails={() => navigate('/linux-rules')}
        onTechMarathonMoreDetails={() => navigate('/technical-marathon')}
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
        <Route path="/box-rules" element={<BoxCricketDetails />} />
        <Route path="/linux-rules" element={<LinuxQuizDetails />} />
        <Route path="/technical-marathon" element={<TechnicalMarathonDetails />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;