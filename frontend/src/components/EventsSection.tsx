import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { events } from '../data/events';

interface EventsSectionProps {
  onGDMoreDetails: () => void;
  onBoxMoreDetails: () => void;
  onLinuxMoreDetails: () => void;
  onTechMarathonMoreDetails: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ onGDMoreDetails, onBoxMoreDetails, onLinuxMoreDetails, onTechMarathonMoreDetails }) => {
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState('');
  const [formFields, setFormFields] = useState({ name: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', phone: '' });
  const [boxPlayers, setBoxPlayers] = useState<string[]>(Array(7).fill(''));

  const handleCertificateDownload = async (eventTitle: string, details: { name: string; email: string; phone: string; }) => {
    setDownloadStatus('Downloading certificate...');
    setDownloadError(null);
    const { name, email, phone } = details;
    try {
      const res = await fetch('/api/download-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, event: eventTitle }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${eventTitle.replace(/\s+/g, '_')}_${name}_certificate.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        setDownloadError(null);
        setDownloadStatus(null);
        setIsModalOpen(false);
      } else {
        const errData = await res.json().catch(() => null);
        const msg = errData?.error || 'Certificate download failed';
        setDownloadError(msg);
        setDownloadStatus(null);
      }
    } catch (err) {
      console.error(err);
      setDownloadError('Certificate download failed.');
      setDownloadStatus(null);
    }
  };

  const openModal = (eventTitle: string) => {
    setModalEvent(eventTitle);
    setFormFields({ name: '', email: '', phone: '' });
    setFormErrors({ name: '', email: '', phone: '' });
    setBoxPlayers(Array(7).fill(''));
    setDownloadError(null);
    setDownloadStatus(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof formErrors = { name: '', email: '', phone: '' };
    if (modalEvent === 'Box Cricket') {
      const playerErrors = boxPlayers.map(name => !name.trim());
      if (playerErrors.some(err => err)) {
        setDownloadError('All player names are required');
        return;
      }
    } else {
      if (!formFields.name.trim()) errors.name = 'Name is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formFields.email)) errors.email = 'Valid email is required';
    if (!/^\d{10}$/.test(formFields.phone)) errors.phone = 'Valid 10-digit phone is required';
    setFormErrors(errors);
    if (errors.name || errors.email || errors.phone) return;
    setDownloadError(null);
    setDownloadStatus('Downloading certificate...');
    if (modalEvent === 'Box Cricket') {
      for (const playerName of boxPlayers) {
        await handleCertificateDownload(modalEvent, { name: playerName, email: formFields.email, phone: formFields.phone });
      }
      setDownloadStatus(null);
      setIsModalOpen(false);
    } else {
      handleCertificateDownload(modalEvent, formFields);
    }
  };

  return (
    <section id="events" className="relative min-h-screen w-full py-20 px-4 flex items-center justify-center overflow-hidden">
      {/* Decorative blurred background accents */}
      <div className="absolute left-0 top-0 w-80 h-80 bg-gradient-to-br from-blue-600/30 via-fuchsia-500/20 to-indigo-700/20 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute right-0 bottom-0 w-72 h-72 bg-gradient-to-tr from-yellow-400/20 via-pink-500/20 to-blue-400/20 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text drop-shadow-lg gradient-title-neuroverse tracking-tight pt-10">Our Events</h2>
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
              <div className="flex flex-col mt-4 gap-5">
                <button
                  className={`w-full font-bold rounded-lg py-2 text-base shadow-xl transition-all duration-300 border-0 outline-none bg-gradient-to-r ${event.accent} hover:bg-gradient-to-l ${event.accent.split(' ').reverse().join(' ')} hover:text-white hover:shadow-2xl hover:scale-105 focus:ring-2 focus:ring-white/60`}
                  style={{ marginBottom: 0, backgroundSize: '200% 200%' }}
                  onClick={() => {
                    // Scroll to top before navigating
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    if (event.title === 'Group Discussion (GD)') onGDMoreDetails();
                    else if (event.title === 'Box Cricket') onBoxMoreDetails();
                    else if (event.title === 'Dock The Flag') onLinuxMoreDetails();
                    else if (event.title === 'Technical Marathon') onTechMarathonMoreDetails();
                  }}
                >
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white drop-shadow-md">
                    More Details
                  </span>
                </button>
                <button
                  type="button"
                  className="w-full btn-secondary"
                  onClick={() => {
                    fetch('/api/download-certificate', { method: 'PUT' })
                      .then(res => res.json())
                      .then(data => {
                        if (data.success) {
                          openModal(event.title);
                        } else {
                          alert('You will be able to download certificates after all the events are completed');
                        }
                      })
                      .catch(() => {
                        alert('Unable to check certificate availability');
                      });
                  }}
                >
                  Download Certificate
                </button>
              </div>
            </motion.div>
          ))}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Download {modalEvent} Certificate</h3>
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  {modalEvent === 'Box Cricket' ? (
                    <div>
                      <label className="block text-sm font-medium mb-2">Player Names (7)<span className="text-red-500">*</span></label>
                      {boxPlayers.map((player, idx) => (
                        <input
                          key={idx}
                          className="form-input w-full mb-1"
                          placeholder={idx === 0 ? 'Leader' : `Player ${idx + 1}`}
                          value={player}
                          onChange={e => {
                            const arr = [...boxPlayers]; arr[idx] = e.target.value; setBoxPlayers(arr);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium">Name<span className="text-red-500">*</span></label>
                      <input
                        className="form-input w-full"
                        value={formFields.name}
                        onChange={e => setFormFields({ ...formFields, name: e.target.value })}
                      />
                      {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium">Email<span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      className="form-input w-full"
                      value={formFields.email}
                      onChange={e => setFormFields({ ...formFields, email: e.target.value })}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Phone<span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      className="form-input w-full"
                      value={formFields.phone}
                      onChange={e => setFormFields({ ...formFields, phone: e.target.value })}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button type="submit" className="btn-primary">Download</button>
                  </div>
                  {downloadError && <p className="text-red-500 text-sm mt-2">{downloadError}</p>}
                  {downloadStatus && <p className="text-green-500 text-sm mt-2">{downloadStatus}</p>}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
