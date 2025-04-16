import React from 'react';

const TechnicalMarathonDetails: React.FC = () => (
  <div className="min-h-screen theme-bg theme-text flex items-center justify-center py-10">
    <div className="max-w-2xl w-full mx-auto p-6 glass-card rounded-2xl">
      {/* Horizontal rectangle at the top */}
      <div className="w-full h-20 rounded-xl mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-80 shadow-lg" />
      <h1 className="text-3xl font-bold text-center mb-2 gradient-text">Technical Marathon</h1>
      <p className="text-center mb-2">Date: To Be Announced</p>
      <p className="text-center mb-6"><strong>Details:</strong> Further details related to time and venue will be shared soon.</p>
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
    </div>
  </div>
);

export default TechnicalMarathonDetails;
