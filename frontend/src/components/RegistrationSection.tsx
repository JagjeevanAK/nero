import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { events } from '../data/events';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  college: string;
  event: string;
  teamMembers?: string;
  yearOfStudy: string;
  boxCricketPlayers?: string[];
  referenceCode?: string;
};

const RegistrationSection: React.FC = () => {
  // loading state to block UI during registration
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>();
  const selectedEvent = watch('event');
  const [submissionStatus, setSubmissionStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const eventMap: Record<string, string> = {
      'Group Discussion (GD)': 'Group Discussion',
      'Technical Marathon': 'Technical Marathon',
      'Dock The Flag': 'Dock The Flag',
      'Box Cricket': 'Box Cricket',
    };
    const event_name = eventMap[data.event] || data.event;
    const formData: any = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      college: data.college,
      yearOfStudy: data.yearOfStudy,
      event_name,
      reference: data.referenceCode || '',
    };

    // include boxCricketPlayers array when applicable
    if (event_name === 'Box Cricket') {
      formData.boxCricketPlayers = data.boxCricketPlayers || [];
    }

    // include team members array when applicable
    if (data.teamMembers) {
      formData.teamMembers = data.teamMembers.split('\n').map(name => name.trim()).filter(Boolean);
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        alert('Registered successfully!');
        window.location.reload();
        return;
      }
      setSubmissionStatus({ message: result.error || 'Registration failed.', type: 'error' });
    } catch (error) {
      setSubmissionStatus({ message: 'Registration failed.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const currentEventFee = events.find(e => e.title === watch('event'))?.fee || 0;

  return (
    <section id="registration" className="min-h-screen w-full py-20 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full glass-card rounded-3xl p-0 shadow-2xl border border-white/20 backdrop-blur-lg relative overflow-hidden">
        {/* Page Title */}
        <h2 className="text-4xl font-extrabold text-center gradient-title-neuroverse drop-shadow-lg tracking-tight pt-10 pb-2">
          Registration
        </h2>
        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg border-4 border-blue-300">1</div>
            <span className="mt-2 text-xs font-semibold theme-text-secondary">Personal Info</span>
          </div>
          <div className="h-1 w-10 bg-blue-300 rounded-full"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-fuchsia-500 text-white font-bold text-lg shadow-lg border-4 border-fuchsia-300">2</div>
            <span className="mt-2 text-xs font-semibold theme-text-secondary">Event Details</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 px-8 py-10 md:py-12">
          {/* block form when loading */}
          <div className={isLoading ? 'absolute inset-0 bg-black bg-opacity-50 z-50 pointer-events-none' : ''}></div>
          {/* Personal Info Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-blue-500 border border-blue-200"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.761-3.582-5-8-5Z"/></svg></span>
              <h3 className="text-lg font-bold theme-text">Personal Info</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-base font-semibold mb-1 theme-text-secondary">First Name<span className="text-red-500">*</span></label>
                <input {...register('firstName', { required: 'First name is required' })} className="form-input bg-white/10 theme-text placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400" placeholder="First name" />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-base font-semibold mb-1 theme-text-secondary">Last Name<span className="text-red-500">*</span></label>
                <input {...register('lastName', { required: 'Last name is required' })} className="form-input bg-white/10 theme-text placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400" placeholder="Last name" />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
              {/* Email */}
              <div>
                <label className="block text-base font-semibold mb-1 theme-text-secondary">Email<span className="text-red-500">*</span></label>
                <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' } })} className="form-input bg-white/10 theme-text placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400" placeholder="you@email.com" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              {/* Phone */}
              <div>
                <label className="block text-base font-semibold mb-1 theme-text-secondary">Phone Number<span className="text-red-500">*</span></label>
                <input type="tel" {...register('phone', { required: 'Phone number is required', pattern: { value: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' } })} className="form-input bg-white/10 theme-text placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400" placeholder="10-digit number" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              {/* College Name and Year of Study on same line */}
              <div className="col-span-1 md:col-span-1 flex flex-col">
                <label className="block text-base font-semibold mb-1 theme-text-secondary">College Name<span className="text-red-500">*</span></label>
                <input {...register('college', { required: 'College name is required' })} className="form-input bg-white/10 theme-text placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400" placeholder="Your college" />
                {errors.college && <p className="text-red-400 text-xs mt-1">{errors.college.message}</p>}
              </div>
              <div className="col-span-1 md:col-span-1 flex flex-col">
                <label className="block text-base font-semibold mb-1 theme-text-secondary">Year of Study<span className="text-red-500">*</span></label>
                <select {...register('yearOfStudy', { required: 'Please select your year of study' })} className="form-input bg-white/10 theme-text focus:ring-2 focus:ring-blue-400">
                  <option value="">--Select year--</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Other">Other</option>
                </select>
                {errors.yearOfStudy && <p className="text-red-400 text-xs mt-1">{errors.yearOfStudy.message}</p>}
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="flex items-center gap-2 my-2">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-fuchsia-500 border border-fuchsia-200"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 6v6l4 2"/></svg></span>
            <h3 className="text-lg font-bold theme-text">Event Details</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-fuchsia-400/40 to-indigo-400/10 ml-2"></div>
          </div>
          {/* Event Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mt-6">
            {/* Select Event */}
            <div>
              <label className="block text-base font-semibold mb-1 theme-text-secondary">Select Event<span className="text-red-500">*</span></label>
              <select {...register('event', { required: 'Please select an event', onChange: e => { if (e.target.value !== 'Box Cricket') setValue('boxCricketPlayers', undefined); } })} className="form-input bg-white/10 theme-text focus:ring-2 focus:ring-fuchsia-400">
                <option value="">--Select an event--</option>
                {events.map(event => (<option key={event.id} value={event.title}>{event.title}</option>))}
              </select>
              {errors.event && <p className="text-red-400 text-xs mt-1">{errors.event.message}</p>}
            </div>
            {/* Reference Code */}
            <div>
              <label className="block text-base font-semibold mb-1 theme-text-secondary">Reference Code (Optional)</label>
              <input {...register('referenceCode')} className="form-input bg-white/10 theme-text placeholder:text-slate-400 focus:ring-2 focus:ring-fuchsia-400" placeholder="Enter reference code if any" />
            </div>
          </div>
          {/* Box Cricket Players */}
          {selectedEvent === 'Box Cricket' && (
            <div className="bg-blue-900/10 border border-blue-400/20 rounded-xl p-4 mt-2">
              <label className="block text-base font-semibold mb-2 text-blue-300">Team Members (7 Players)<span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Array.from({ length: 7 }).map((_, idx) => (
                  <div key={idx}>
                    <input className="form-input bg-white/10 theme-text placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400" placeholder={`Player ${idx + 1} Name`} {...register(`boxCricketPlayers.${idx}` as const, { required: 'Player name is required', validate: value => value && value.trim() !== '' || 'Player name is required' })} />
                    {errors.boxCricketPlayers && errors.boxCricketPlayers[idx] && (<p className="text-red-400 text-xs mt-1">{errors.boxCricketPlayers[idx]?.message as string}</p>)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Team Members for other team events */}
          {selectedEvent && events.find(e => e.title === selectedEvent)?.requiresTeam && selectedEvent !== 'Box Cricket' && selectedEvent !== 'Technical Marathon' && (
            <div>
              <label className="block text-base font-semibold mb-1 theme-text-secondary">Team Members</label>
              <textarea {...register('teamMembers')} rows={3} className="form-input bg-white/10 theme-text placeholder:text-slate-400 focus:ring-2 focus:ring-fuchsia-400" placeholder="Enter team members' names (one per line)" />
            </div>
          )}
          {/* Reference Code & Entry Fee Row */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center justify-between bg-blue-900/20 border border-blue-400/20 rounded-xl p-4 min-w-[260px] max-w-xs w-full">
              <span className="text-base font-semibold text-blue-200">Entry Fee:</span>
              <span className="text-2xl font-bold text-blue-400">₹{currentEventFee}</span>
            </div>
          </div>
          {/* Submit Button */}
          <button type="submit" disabled={isLoading} className="w-full btn-primary text-lg font-bold shadow-lg py-4 mt-2 hover:scale-105 transition-transform">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {/* Loader overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-transparent flex items-center justify-center z-50">
            <img src="/logo.png" alt="Loading..." className="w-16 h-16 animate-spin-slow" />
          </div>
        )}
        {/* Info Box */}
        <div className="px-8 pb-8">
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-900/30 via-fuchsia-900/20 to-indigo-900/30 border border-blue-400/10 text-sm theme-text-secondary flex items-center gap-3">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-blue-400"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M12 8v4m0 4h.01"/></svg>
            <span>Need help? Contact us at <a href="mailto:neuroverse2025@gmail.com" className="underline text-blue-300">neuroverse2025@gmail.com</a> or ask at the event desk.</span>
          </div>
        </div>
        {/* Submission Status */}
        {submissionStatus && (
          <div className={`mx-8 mb-8 p-4 rounded-xl text-center font-semibold text-lg ${submissionStatus.type === 'success' ? 'bg-green-900/20 text-green-300 border border-green-400/20' : 'bg-red-900/20 text-red-300 border border-red-400/20'} glass-card`}>
            {submissionStatus.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default RegistrationSection;
