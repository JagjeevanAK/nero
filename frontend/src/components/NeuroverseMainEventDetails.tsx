import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Gift, Users, Award } from "lucide-react";

const accentBg =
  "bg-gradient-to-br from-blue-900/40 via-indigo-800/30 to-fuchsia-700/20 absolute -z-10 rounded-full blur-3xl opacity-60";

const NeuroverseMainEventDetails: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background accent */}
      <div
        className={`${accentBg} w-96 h-96 top-[-5rem] left-[-5rem] z-0`}
      ></div>
      <motion.div
        id="main-event"
        className="w-full max-w-4xl glass-card rounded-3xl flex flex-col gap-8 p-6 md:p-12 mb-8 scroll-mt-24 shadow-2xl border border-white/20 backdrop-blur-lg relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <motion.p
          className="text-lg md:text-xl text-center mb-6 theme-text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h2 className="font-mokoto text-3xl md:text-4xl font-extrabold text-center gradient-title-neuroverse drop-shadow-lg mb-2">
            The Grand Tech & Sports Fest
          </h2>
          <span className="text-base md:text-lg">
            Organized by the Department of Artificial Intelligence and Data
            Science
          </span>
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <motion.div className="flex items-center justify-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 shadow-sm mx-auto w-full sm:w-80">
            <Gift className="w-8 h-8 text-pink-400" />
            <div>
              <div className="font-bold text-lg">Total Prizes</div>
              <div className="text-blue-400 font-semibold text-xl">₹16,000</div>
            </div>
          </motion.div>
          <motion.div className="flex items-center gap-4 p-4 justify-center rounded-lg bg-white/5 border border-white/10 shadow-sm mx-auto w-full sm:w-80">
            <Calendar className="w-8 h-8 text-indigo-400" />
            <div>
              <div className="font-bold text-lg">Dates</div>
              <div className="text-blue-200">26 April 2025</div>
            </div>
          </motion.div>
          <motion.div className="flex items-center gap-4 p-4 justify-center rounded-lg bg-white/5 border border-white/10 shadow-sm mx-auto w-full sm:w-80">
            <MapPin className="w-8 h-8 text-indigo-400" />
            <div>
              <div className="font-bold text-lg">Venue</div>
              <div className="text-blue-200">ADCET, Ashta</div>
            </div>
          </motion.div>
          <motion.div className="flex items-center justify-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 shadow-sm mx-auto w-full sm:w-80">
            <Award className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="font-bold text-lg">Timing</div>
              <div className="text-blue-200">9:00 AM onwards</div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="rounded-xl bg-white/10 border border-white/10 p-6 mb-4 max-w-130 flex flex-col items-center justify-center m-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Event Coordinators</h2>
          </div>
          <ul className="list-disc list-inside theme-text-secondary ml-6">
            <li>
              <b>Dr. A. A. Shaikh</b> (HOD, AIDS Dept.)
            </li>
            <li>
              <b>Prof. V. N. Honmane</b> (Faculty Coordinator)
            </li>
            <li>
              <b>Student Coordinators:</b>
            </li>
            <ul className="ml-8 list-disc">
              <li>Pranav Patil</li>
              <li>Jagjeevan Kashid</li>
              <li>Yashraj Salunkhe</li>
              <li>Gaurav Kumbare</li>
              <li>Tanmay Patil</li>
            </ul>
          </ul>
        </motion.div>
        <motion.button
          className="m-auto  px-19 max-w-93 flex item-center justify-center btn-primary text-lg shadow-lg"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            document
              .getElementById("events")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          See All Events
        </motion.button>
      </motion.div>
    </section>
  );
};

export default NeuroverseMainEventDetails;
