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
    setDownloadError(null);
    setDownloadStatus(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof formErrors = { name: '', email: '', phone: '' };
    if (!formFields.name.trim()) errors.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formFields.email)) errors.email = 'Valid email is required';
    if (!/^\d{10}$/.test(formFields.phone)) errors.phone = 'Valid 10-digit phone is required';
    setFormErrors(errors);
    if (errors.name || errors.email || errors.phone) return;
    handleCertificateDownload(modalEvent, formFields);
  };

  return (
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
              <div className="flex flex-col mt-4 gap-5">
                <button
                  className="w-full btn-primary"
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
                <button
                  type="button"
                  className="w-full btn-secondary"
                  onClick={() => {
                    // Check server feature flag via PUT
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
                  <div>
                    <label className="block text-sm font-medium">Name<span className="text-red-500">*</span></label>
                    <input
                      className="form-input w-full"
                      value={formFields.name}
                      onChange={e => setFormFields({ ...formFields, name: e.target.value })}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                  </div>
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
