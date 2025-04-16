import React from 'react';
import { useNavigate } from 'react-router-dom';

const TechnicalMarathonDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen theme-bg theme-text py-10 px-4 flex flex-col justify-between">
      <div className="w-full max-w-6xl mx-auto p-10 glass-card rounded-2xl min-h-[80vh] flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <button className="mb-6 btn-secondary" onClick={() => navigate(-1)}>← Return</button>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Technical Marathon</h1>
          <p className="mb-2">Date: To Be Announced</p>
          <p className="mb-6"><strong>Details:</strong> Further details related to time and venue will be shared soon.</p>
          <h2 className="text-xl font-semibold mb-2">Event Overview</h2>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Test your technical knowledge and problem-solving skills in this coding and technical challenge.</li>
            <li>Open to all registered participants.</li>
            <li>Team participation required (team size and rules will be announced soon).</li>
            <li>Bring your own laptops and chargers.</li>
            <li>Internet access may be restricted during the event.</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">Contact For Further Information</h2>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Event Coordinator: To Be Announced</li>
          </ul>
          <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>← Return</button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalMarathonDetails;
