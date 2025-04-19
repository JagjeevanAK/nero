import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
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

const TechnicalMarathonDetails: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-3xl glass-card rounded-2xl flex flex-col gap-6 p-6 md:p-12">
        <EventDetailHeader title="Technical Marathon" icon={Terminal} accent="from-blue-500 to-purple-500" />
        <SectionCard>
          <p className="mb-2">Date: 26 April 2k25</p>
          <p className="mb-6"><strong>Details:</strong> Further details related to time and venue will be shared soon.</p>
        </SectionCard>
        <SectionCard title="🏁 Technical Marathon – Event Description & Rules">
          <h3 className="text-lg font-semibold mb-2">📌 Event Description</h3>
          <p className="mb-2">A multi-round technical treasure hunt involving coding, logic, and team strategy.</p>
          <p className="mb-2">Participants will progress through different levels by solving problems and uncovering clues to reach the next stage.</p>
          <div className="mb-4 p-3 rounded bg-blue-100 text-blue-900 border-l-4 border-blue-500">
            <strong>Note:</strong> All coding problems in this event will be based on the <b>C++ programming language</b>. Participants are expected to be familiar with basic to intermediate concepts of C++.
          </div>
          <h3 className="text-lg font-semibold mb-2">🧠 Round Structure</h3>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li className="mb-2">
              <b>🔹 Round 1 – MCQ Test (Screening)</b><br />
              Individual participants will take a technical MCQ test.<br />
              Based on the results, the top 40 participants will qualify for the next round.<br />
              These 40 will be randomly grouped into 10 teams (4 participants per team).
            </li>
            <li className="mb-2">
              <b>🔹 Round 2 – Clue Hunt (Team Round)</b><br />
              Each team will solve a chain of coding or logic problems.<br />
              Solving a problem gives a clue to the next location or task.<br />
              Teams will race against each other to find and solve as many clues as possible.<br />
              The top 6 teams with the most clues solved in the shortest time will qualify for Round 3.
            </li>
            <li className="mb-2">
              <b>🔹 Round 3 – Final Showdown</b><br />
              The 6 finalist teams will compete in a final, more challenging clue-solving round.<br />
              Based on performance, the top 2 teams will be selected.<br />
              The best performing team wins the Winner’s Prize; the second-best gets the Runner-Up Prize.
            </li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">📜 General Rules</h3>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Solo registration only. Teams will be formed after Round 1.</li>
            <li>Use of mobile phones, internet, or external help is strictly prohibited unless specified in the problem.</li>
            <li>All problems must be fully solved to receive the next clue.</li>
            <li>Participants must not follow or copy other teams.</li>
            <li>No tampering with problems, clues, or materials not assigned to your team.</li>
            <li>Each team must get their solution verified by an event coordinator before moving ahead.</li>
            <li>Respect the event venue, volunteers, and coordinators at all times.</li>
            <li>In case of a tie, a bonus challenge or rapid-fire round will determine the winner.</li>
            <li>Any form of cheating, misbehaviour, or rule violation will result in immediate disqualification.</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">🔒 Additional Guidelines</h3>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Time Limit: Some problems may have a strict time cap. Failing to solve in time may lead to penalties or limited hints.</li>
            <li>Clue Security: Do not remove, hide, or damage clues for other participants.</li>
            <li>Fair Play: Collaboration between different teams is not allowed.</li>
            <li>Checkpoint Validation: Problem solutions must be approved before receiving the next clue.</li>
          </ul>
        </SectionCard>
        <ContactCard name="Gaurav Kumbhare" phone="7768807185" email="kumbharegaurav100@gmail.com" />
        <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>
          ← Return
        </button>
      </div>
    </div>
  );
};

export default TechnicalMarathonDetails;
