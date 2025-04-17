import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Code2, Link as Linux, Ticket as Cricket } from 'lucide-react';
import { events } from '../data/events';

interface EventsSectionProps {
  onGDMoreDetails: () => void;
  onBoxMoreDetails: () => void;
  onLinuxMoreDetails: () => void;
  onTechMarathonMoreDetails: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ onGDMoreDetails, onBoxMoreDetails, onLinuxMoreDetails, onTechMarathonMoreDetails }) => (
  <section id="events" className="min-h-screen w-full py-20 px-4 flex items-center justify-center">
    <div className="w-full max-w-7xl">
      <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Our Events</h2>
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
            <button
              className="w-full btn-primary mt-4"
              style={{ marginBottom: 20 }}
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

export default EventsSection;
