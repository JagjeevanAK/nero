import React from 'react';
import { motion } from 'framer-motion';
import { events } from '../data/events';

interface EventsSectionProps {
  onGDMoreDetails: () => void;
  onBoxMoreDetails: () => void;
  onLinuxMoreDetails: () => void;
  onTechMarathonMoreDetails: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ onGDMoreDetails, onBoxMoreDetails, onLinuxMoreDetails, onTechMarathonMoreDetails }) => (
  <section id="events" className="relative min-h-screen w-full py-20 px-4 flex items-center justify-center overflow-hidden">
    {/* Decorative blurred background accents */}
    <div className="absolute left-0 top-0 w-80 h-80 bg-gradient-to-br from-blue-600/30 via-fuchsia-500/20 to-indigo-700/20 rounded-full blur-3xl opacity-50 -z-10"></div>
    <div className="absolute right-0 bottom-0 w-72 h-72 bg-gradient-to-tr from-yellow-400/20 via-pink-500/20 to-blue-400/20 rounded-full blur-3xl opacity-40 -z-10"></div>
    <div className="w-full max-w-7xl">
      <h2 className="text-4xl font-bold text-center mb-16 gradient-text drop-shadow-lg">Our Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: event.id * 0.1 }}
            className={`relative rounded-2xl p-6 flex flex-col h-full justify-between shadow-xl border-0 bg-gradient-to-br ${event.accent} hover:scale-[1.03] transition-transform duration-300`}
          >
            {/* Solo/Team badge at absolute top left */}
            <div className="absolute left-0 top-0 z-20">
              <span className={`rounded-br-xl rounded-tl-2xl px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-lg ring-2 ring-white/30 ${event.badgeColor} drop-shadow-md`} style={{borderTopLeftRadius: '1rem', borderBottomRightRadius: '1rem'}}>
                {event.badge}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 shadow-lg mb-2">
                  <event.icon className="w-10 h-10 text-white drop-shadow-md" />
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${event.badgeColor}`}>{event.badge}</span>
                <span className="px-4 py-1 rounded-full text-lg font-extrabold bg-black/30 text-yellow-300 shadow-lg border-2 border-yellow-400/60 tracking-wide ">
                  ₹{event.fee}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2 text-center text-white drop-shadow-lg tracking-tight leading-snug">
                {event.title}
              </h3>
              <p className="text-white/95 text-center mb-6 text-base font-medium leading-relaxed drop-shadow-sm">
                {/* Add creative highlight for keywords */}
                {event.description.split(' ').map((word, i) =>
                  ['skills', 'challenge', 'test', 'cricket', 'quiz', 'leadership', 'coding', 'team', 'communication', 'Linux'].some(kw => word.toLowerCase().includes(kw.toLowerCase())) ?
                    <span key={i} className="text-yellow-200 font-semibold ">{word} </span>
                    : <span key={i}>{word} </span>
                )}
              </p>
            </div>
            <button
              className={`w-full mt-4 font-bold rounded-lg py-2 text-base shadow-xl transition-all duration-300 border-0 outline-none bg-gradient-to-r ${event.accent} hover:bg-gradient-to-l ${event.accent.split(' ').reverse().join(' ')} hover:text-white hover:shadow-2xl hover:scale-105 focus:ring-2 focus:ring-white/60`}
              style={{ marginBottom: 10, backgroundSize: '200% 200%' }}
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
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white drop-shadow-md">
                More Details
              </span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
