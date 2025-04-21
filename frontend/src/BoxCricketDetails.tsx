import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, MessageCircle, Flag, Terminal } from "lucide-react";

const eventIcons: Record<string, any> = {
  "Box Cricket": Trophy,
  "Group Discussion": MessageCircle,
  "Linux Quiz": Flag,
  "Technical Marathon": Terminal,
};

const EventDetailHeader: React.FC<{
  title: string;
  icon: any;
  accent: string;
}> = ({ title, icon: Icon, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className={`relative flex flex-col items-center justify-center mb-6`}
  >
    <div
      className={`absolute -top-10 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full blur-3xl opacity-40 -z-10 bg-gradient-to-br ${accent}`}
    ></div>
    <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 shadow-lg mb-2">
      <Icon className="w-12 h-12 text-white drop-shadow-md" />
    </span>
    <h1 className="text-4xl font-extrabold gradient-title-neuroverse text-center drop-shadow-lg mb-2">
      {title}
    </h1>
    <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-400 via-fuchsia-400 to-indigo-400 mb-2"></div>
  </motion.div>
);

const SectionCard: React.FC<{
  children: React.ReactNode;
  icon?: any;
  title?: string;
  accent?: string;
}> = ({
  children,
  icon: Icon,
  title,
  accent = "from-blue-900/40 to-indigo-900/20",
}) => (
  <div
    className={`relative rounded-2xl p-5 md:p-7 mb-4 bg-gradient-to-br ${accent} border border-white/10 shadow-lg overflow-hidden`}
  >
    {title && (
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className="w-6 h-6 text-blue-400" />}
        <h2 className="text-xl font-bold gradient-text drop-shadow">{title}</h2>
      </div>
    )}
    <div className="theme-text-secondary text-base md:text-lg leading-relaxed">
      {children}
    </div>
  </div>
);

const ContactCard: React.FC<{ name: string; phone: string; email: string }> = ({
  name,
  phone,
  email,
}) => (
  <div className="rounded-2xl p-5 md:p-7 bg-gradient-to-br from-fuchsia-900/30 to-blue-900/20 border border-fuchsia-400/10 shadow-xl flex flex-col gap-2 items-start mt-4">
    <div className="flex items-center gap-3 mb-2">
      <MessageCircle className="w-6 h-6 text-fuchsia-400" />
      <span className="text-lg font-bold gradient-text">
        Contact For Further Information
      </span>
    </div>
    <div className="ml-2">
      <div className="mb-1">
        <span className="font-semibold text-blue-200">Event Coordinator:</span>{" "}
        {name}
      </div>
      <div className="mb-1">
        <span className="font-semibold text-blue-200">Contact No:</span> {phone}
      </div>
      <div>
        <span className="font-semibold text-blue-200">Email:</span>{" "}
        <a
          href={`mailto:${email}`}
          className="underline text-fuchsia-300 hover:text-fuchsia-200"
        >
          {email}
        </a>
      </div>
    </div>
  </div>
);

const BoxCricketDetails: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-3xl glass-card rounded-2xl flex flex-col gap-6 p-6 md:p-12">
        <EventDetailHeader
          title="Box Cricket"
          icon={eventIcons["Box Cricket"]}
          accent="from-blue-500 to-purple-500"
        />
        <SectionCard title="Rules & Regulations">
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>
              Each team consists of 7 players (one player in only one team).
            </li>
            <li>Match will consist of 4 overs.</li>
            <li>Only 1 bowler can bowl 1 over.</li>
            <li>Catches: Direct catches only.</li>
            <li>In case of tie, Super Over will be played.</li>
            <li>Six allowed only in the straight area.</li>
            <li>Matches will be played by knockout stages.</li>
            <li>
              Umpire decisions are final & arguments with umpire will lead to
              team disqualification. This will be strictly followed.
            </li>
          </ul>
        </SectionCard>
        <ContactCard
          name="Athrav Patil"
          phone="7517824665"
          email="atupatil7867@gmail.com"
        />
        <button
          className="mt-8 w-full btn-primary"
          style={{ background: "linear-gradient(to right, #2563eb, #4f46e5)" }}
          onClick={() => {
            navigate(-1);
            setTimeout(() => {
              document
                .getElementById("events")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          ← Return
        </button>
      </div>
    </div>
  );
};

export default BoxCricketDetails;
