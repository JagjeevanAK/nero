import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Code2, Link as Linux, Ticket as Cricket, ChevronDown, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GroupDiscussionDetails from './GroupDiscussionDetails';
import BoxCricketDetails from './BoxCricketDetails';
import LinuxQuizDetails from './LinuxQuizDetails';
import TechnicalMarathonDetails from './TechnicalMarathonDetails';

const events = [
  {
    id: 1,
    title: "Group Discussion (GD)",
    icon: MessageCircle,
    fee: 70,
    description: "Showcase your communication skills, analytical thinking, and leadership in a moderated group setting.",
    requiresTeam: false
  },
  {
    id: 2,
    title: "Technical Marathon",
    icon: Code2,
    fee: 70,
    description: "Test your technical knowledge and problem-solving skills in this coding and technical challenge.",
    requiresTeam: true
  },
  {
    id: 3,
    title: "Dock The Flag",
    icon: Linux,
    fee: 70,
    description: "Put your Linux knowledge to the test in this fast-paced quiz competition about the open-source OS.",
    requiresTeam: false
  },
  {
    id: 4,
    title: "Box Cricket",
    icon: Cricket,
    fee: 300,
    description: "Experience cricket in a compact format with this exciting team sport in a limited space.",
    requiresTeam: true
  }
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  college: string;
  event: string;
  teamMembers: string;
};

function EventsSection({ onGDMoreDetails, onBoxMoreDetails, onLinuxMoreDetails, onTechMarathonMoreDetails }: { onGDMoreDetails: () => void, onBoxMoreDetails: () => void, onLinuxMoreDetails: () => void, onTechMarathonMoreDetails: () => void }) {
  return (
    <section id="events" className="min-h-screen w-full py-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
          Our Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-xl p-6 flex flex-col h-full justify-between"
            >
              <div>
                <div className="flex justify-center mb-4">
                  <event.icon className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{event.title}</h3>
                <p className="text-blue-500 text-center mb-4">₹{event.fee}</p>
                <p className="theme-text-secondary text-center mb-6">{event.description}</p>
              </div>
              <button className="w-full btn-primary mt-4" style={{ marginBottom: 20 }}
                onClick={
                  event.title === 'Group Discussion (GD)'
                    ? onGDMoreDetails
                    : event.title === 'Box Cricket'
                    ? onBoxMoreDetails
                    : event.title === 'Dock The Flag'
                    ? onLinuxMoreDetails
                    : event.title === 'Technical Marathon'
                    ? onTechMarathonMoreDetails
                    : undefined
                }
              >
                More Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [submissionStatus, setSubmissionStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showGDModal, setShowGDModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = '';
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionStatus({
        message: 'Registration successful! We\'ll contact you soon with further details.',
        type: 'success'
      });
    } catch (error) {
      setSubmissionStatus({
        message: 'There was a problem with your registration. Please try again later.',
        type: 'error'
      });
    }
  };

  const watchEvent = watch('event');
  const currentEventFee = events.find(e => e.title === watchEvent)?.fee || 0;

  return (
    <div className="min-h-screen theme-bg theme-text">
      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-4 gradient-text"
          >
            Neuroverse 2K25
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl mb-8 theme-text-secondary"
          >
            Unleash Your Inner Genius
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            href="#events"
            className="btn-primary inline-flex items-center"
          >
            Explore Events <ChevronDown className="ml-2" />
          </motion.a>
        </div>
      </header>
      <EventsSection 
        onGDMoreDetails={() => navigate('/gd-rules')} 
        onBoxMoreDetails={() => navigate('/box-rules')} 
        onLinuxMoreDetails={() => navigate('/linux-rules')}
        onTechMarathonMoreDetails={() => navigate('/technical-marathon')}
      />
      {/* Registration Section */}
      <section id="registration" className="min-h-screen w-full py-20 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Register Now
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 glass-card p-8 rounded-2xl">
            <div>
              <label className="block text-sm font-medium mb-2">Name*</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="form-input"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email*</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email'
                  }
                })}
                className="form-input"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number*</label>
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Please enter a valid 10-digit phone number'
                  }
                })}
                className="form-input"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">College Name*</label>
              <input
                {...register('college', { required: 'College name is required' })}
                className="form-input"
              />
              {errors.college && <p className="text-red-400 text-sm mt-1">{errors.college.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Event*</label>
              <select
                {...register('event', { required: 'Please select an event' })}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="form-input"
              >
                <option value="">--Select an event--</option>
                {events.map(event => (
                  <option key={event.id} value={event.title}>{event.title}</option>
                ))}
              </select>
              {errors.event && <p className="text-red-400 text-sm mt-1">{errors.event.message}</p>}
            </div>

            {selectedEvent && events.find(e => e.title === selectedEvent)?.requiresTeam && (
              <div>
                <label className="block text-sm font-medium mb-2">Team Members</label>
                <textarea
                  {...register('teamMembers')}
                  rows={3}
                  className="form-input"
                  placeholder="Enter team members' names (one per line)"
                />
              </div>
            )}

            <div className="glass-card p-4 rounded-lg">
              <p className="text-sm font-medium">Entry Fee:</p>
              <p className="text-2xl font-bold text-blue-500">₹{currentEventFee}</p>
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
            >
              Register
            </button>
          </form>

          {submissionStatus && (
            <div className={`mt-4 p-4 rounded-lg ${
              submissionStatus.type === 'success' ? 'bg-green-600/20' : 'bg-red-600/20'
            } glass-card`}>
              {submissionStatus.message}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 glass-card mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <p className="theme-text-secondary mb-2">Contact: neuroverse2k25@college.edu</p>
          <p className="theme-text-secondary opacity-60">© 2k25 Neuroverse | Department of Artificial Intelligence and Data Science</p>
        </div>
      </footer>
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