import React from 'react';
import { motion } from 'framer-motion';
import type { events as EventsArray } from '../data/events';

type EventType = typeof EventsArray[number];

interface EventCardProps {
  event: EventType;
  certEnabled: boolean;
  onMoreDetails: () => void;
  onDownloadClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, certEnabled, onMoreDetails, onDownloadClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: event.id * 0.1 }}
    className={`relative rounded-2xl p-6 flex flex-col h-full justify-between shadow-xl border-0 bg-gradient-to-br ${event.accent} hover:scale-[1.03] transition-transform duration-300`}
  >
    <div className="absolute left-0 top-0 z-20">
      <span className={`rounded-br-xl rounded-tl-2xl px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-lg ring-2 ring-white/30 ${event.badgeColor} drop-shadow-md`} style={{ borderTopLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
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
        {event.description.split(' ').map((word, i) =>
          ['skills', 'challenge', 'test', 'cricket', 'quiz', 'leadership', 'coding', 'team', 'communication', 'Linux'].some(kw => word.toLowerCase().includes(kw.toLowerCase())) ?
            <span key={i} className="text-yellow-200 font-semibold ">{word} </span>
            : <span key={i}>{word} </span>
        )}
      </p>
    </div>
    <div className="flex flex-col mt-4 gap-5">
      <button
        className={`w-full font-bold rounded-lg py-2 text-base shadow-xl transition-all duration-300 border-0 outline-none bg-gradient-to-r ${event.accent} hover:bg-gradient-to-l ${event.accent.split(' ').reverse().join(' ')} hover:text-white hover:shadow-2xl hover:scale-105 focus:ring-2 focus:ring-white/60`}
        style={{ marginBottom: 0, backgroundSize: '200% 200%' }}
        onClick={onMoreDetails}
      >
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white drop-shadow-md">
          More Details
        </span>
      </button>
      {certEnabled && (
        <button
          type="button"
          className="w-full btn-secondary"
          onClick={onDownloadClick}
        >
          Download Certificate
        </button>
      )}
    </div>
  </motion.div>
);

export default EventCard;
