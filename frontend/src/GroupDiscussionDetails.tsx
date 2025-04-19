import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const GroupDiscussionDetails: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-3xl glass-card rounded-2xl flex flex-col gap-6 p-6 md:p-12">
        <EventDetailHeader title="Group Discussion" icon={MessageCircle} accent="from-blue-500 to-purple-500" />
        <SectionCard>
          <p className="mb-2">30 April 2025</p>
          <p className="mb-6"><strong>Details:</strong> Further details related to time will be shared soon.</p>
          <h2 className="text-xl font-semibold mb-2">1. General Guidelines</h2>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>The event is open to all registered participants.</li>
            <li>College Identity is Mandatory</li>
            <li>Participants must be present at the venue 10 minutes before the scheduled time.</li>
            <li>Mobile phones and any other electronic devices must be switched off during the discussion.</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">2. Group Formation & Topics</h2>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Participants will be divided into groups of 8-10 members based on the number of entries.</li>
            <li>Topics will be given on the spot by the judge/moderator.</li>
            <li>The topic will be different for each group, but the difficulty level will be the same.</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">3. Rules of the Discussion</h2>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Each group will have 2 minutes for spontaneous preparation and a discussion duration of 10 minutes.</li>
            <li>A moderator will oversee the discussion and ensure smooth proceedings.</li>
            <li>Participants must speak in English.</li>
            <li>Each participant must contribute meaningfully without interrupting others.</li>
            <li>Use of offensive language, personal attacks, or disrespectful behaviour will lead to disqualification by the moderator.</li>
            <li>Participants should not carry notes; spontaneous discussion is encouraged.</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">4. Evaluation Criteria</h2>
          <p className="mb-4 theme-text-secondary">Evaluation criteria will be decided by the judge/moderator.</p>
          <h2 className="text-xl font-semibold mb-2">5. Results & Awards</h2>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>The decision of the judges will be final and binding.</li>
            <li>Winners and runners-up will be announced at the end of the event.</li>
            <li>Certificates and prizes will be awarded as per the event structure.</li>
            <li>Every participant will receive a certificate at the end of the event.</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">6. Miscellaneous</h2>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>AISA (Artificial Intelligence and Data Science Students Association) reserves the right to amend rules if necessary.</li>
            <li>In case of disputes, the decision of the event coordinator will be final.</li>
          </ul>
        </SectionCard>
        <ContactCard name="Tejas Narute" phone="7517055941" email="tejasnarute04@gmail.com" />
        <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>
          ← Return
        </button>
      </div>
    </div>
  );
};

export default GroupDiscussionDetails;
