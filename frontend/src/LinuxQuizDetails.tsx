import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

const EventDetailHeader: React.FC<{ title: string; icon: any; accent: string; }> = ({ title, icon: Icon, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className={`relative flex flex-col items-center justify-center mb-6`}
  >
    <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full blur-3xl opacity-40 -z-10 bg-gradient-to-br ${accent}`}></div>
    <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 shadow-lg mb-2">
      <Icon className="w-12 h-12 text-white drop-shadow-md" />
    </span>
    <h1 className="text-4xl font-extrabold gradient-title-neuroverse text-center drop-shadow-lg mb-2">{title}</h1>
    <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-400 via-fuchsia-400 to-indigo-400 mb-2"></div>
  </motion.div>
);

const SectionCard: React.FC<{ children: React.ReactNode; icon?: any; title?: string; accent?: string; }> = ({ children, icon: Icon, title, accent = 'from-blue-900/40 to-indigo-900/20' }) => (
  <div className={`relative rounded-2xl p-5 md:p-7 mb-4 bg-gradient-to-br ${accent} border border-white/10 shadow-lg overflow-hidden`}> 
    {title && (
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className="w-6 h-6 text-blue-400" />}
        <h2 className="text-xl font-bold gradient-text drop-shadow">{title}</h2>
      </div>
    )}
    <div className="theme-text-secondary text-base md:text-lg leading-relaxed">{children}</div>
  </div>
);

const ContactCard: React.FC<{ name: string; phone: string; email: string; }> = ({ name, phone, email }) => (
  <div className="rounded-2xl p-5 md:p-7 bg-gradient-to-br from-fuchsia-900/30 to-blue-900/20 border border-fuchsia-400/10 shadow-xl flex flex-col gap-2 items-start mt-4">
    <div className="flex items-center gap-3 mb-2">
      <MessageCircle className="w-6 h-6 text-fuchsia-400" />
      <span className="text-lg font-bold gradient-text">Contact For Further Information</span>
    </div>
    <div className="ml-2">
      <div className="mb-1"><span className="font-semibold text-blue-200">Event Coordinator:</span> {name}</div>
      <div className="mb-1"><span className="font-semibold text-blue-200">Contact No:</span> {phone}</div>
      <div><span className="font-semibold text-blue-200">Email:</span> <a href={`mailto:${email}`} className="underline text-fuchsia-300 hover:text-fuchsia-200">{email}</a></div>
    </div>
  </div>
);

const LinuxQuizDetails: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-3xl glass-card rounded-2xl flex flex-col gap-6 p-6 md:p-12">
        <EventDetailHeader title="Dock The Flag" icon={Flag} accent="from-blue-500 to-purple-500" />
        <p className="mb-2 text-center">Date: 26 April 2025</p>
        <SectionCard title="🧩 DockTheFlag – Event Flow">
          <h3 className="text-lg font-semibold mb-2">🛠️ Workshop: Learning & Engagement Phase</h3>
          <ul className="list-disc list-inside mb-2 theme-text-secondary">
            <li><b>⏱️ Duration:</b> 1.5 – 2 hours</li>
            <li><b>🎯 Objective:</b> Build a strong foundation in Linux and cybersecurity concepts.</li>
            <li><b>📚 Format:</b>
              <ul className="list-disc list-inside ml-6">
                <li>Hands-on tutorials</li>
                <li>Live demonstrations</li>
                <li>Interactive Q&A sessions</li>
              </ul>
            </li>
            <li><b>🔍 Topics Covered:</b>
              <ul className="list-disc list-inside ml-6">
                <li>Linux file system structure, permissions, and user management</li>
                <li>Useful Linux commands for system exploration</li>
                <li>Cybersecurity basics like file hiding and process monitoring</li>
              </ul>
            </li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">🧠 Quiz Round: Linux & Security Showdown</h3>
          <ul className="list-disc list-inside mb-2 theme-text-secondary">
            <li><b>🎯 Objective:</b> Test your theoretical and practical knowledge in a fast-paced quiz format.</li>
            <li><b>📊 Structure:</b>
              <ul className="list-disc list-inside ml-6">
                <li>8 unique types of questions</li>
                <li>5 questions per type (40 total)</li>
                <li>1 minute per question</li>
                <li>Real-time leaderboard display</li>
              </ul>
            </li>
            <li><b>🌀 Round Types:</b>
              <ul className="list-disc list-inside ml-6">
                <li>Scenario-Based Questions</li>
                <li>Puzzle & Riddle Challenges</li>
                <li>Time-Limited Concept Tasks</li>
                <li>Visual & Audio Challenges</li>
                <li>Flash Rounds (30-sec pop-ups)</li>
                <li>Spot-the-Mistake (find the flaw)</li>
                <li>Mystery Flag (solve clues)</li>
                <li>Gamified Streaks (bonus for streaks)</li>
              </ul>
            </li>
            <li><b>⚠️ Rules:</b>
              <ul className="list-disc list-inside ml-6">
                <li>Strictly no external help</li>
                <li>Top scorers proceed to final round</li>
                <li>Tie-breaker: Time taken</li>
                <li>Any suspicious behavior = disqualification</li>
              </ul>
            </li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">🚩 Final Round: "DockTheFlag" – The Ultimate Cyber Challenge</h3>
          <ul className="list-disc list-inside mb-2 theme-text-secondary">
            <li><b>🎯 Objective:</b> Hands-on test in a real Linux-based CTF environment.</li>
            <li><b>⚙️ Format:</b>
              <ul className="list-disc list-inside ml-6">
                <li>Guided CTF-style competition</li>
                <li>8 escalating challenges in a Docker environment</li>
                <li>Answers submitted through a web interface</li>
              </ul>
            </li>
            <li><b>🧩 Challenge Types:</b>
              <ul className="list-disc list-inside ml-6">
                <li>Hidden file discovery</li>
                <li>Text decoding</li>
                <li>System misconfiguration exploitation</li>
                <li>Light CTF tasks (e.g., steganography, sudo misuse)</li>
              </ul>
            </li>
            <li><b>⚠️ Rules:</b>
              <ul className="list-disc list-inside ml-6">
                <li>Internet restricted to the event platform</li>
                <li>Pre-built Docker image provided</li>
                <li>Solving one level unlocks the next</li>
                <li>Time-based scoring</li>
              </ul>
            </li>
            <li><b>🏆 Winner Criteria:</b>
              <ul className="list-disc list-inside ml-6">
                <li>Most flags captured</li>
                <li>Least time taken</li>
              </ul>
            </li>
          </ul>
        </SectionCard>
        <ContactCard name="Rakesh Yadhav" phone="9404899768" email="raxlord19@gmail.com" />
        <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>
          ← Return
        </button>
      </div>
    </div>
  );
};

export default LinuxQuizDetails;
