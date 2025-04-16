import React from 'react';
import { useNavigate } from 'react-router-dom';

const BoxCricketDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen theme-bg theme-text flex items-center justify-center py-10">
      <div className="max-w-2xl w-full mx-auto p-6 glass-card rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 gradient-text">Box Cricket</h1>
        <p className="text-center mb-2">Date: To Be Announced</p>
        <p className="text-center mb-6"><strong>Details:</strong> Further details related to time and venue will be shared soon.</p>

        <h2 className="text-xl font-semibold mb-2">Rules & Regulations</h2>
        <ul className="list-disc list-inside mb-4 theme-text-secondary">
          <li>Each team consists of 7 players (one player in only one team).</li>
          <li>Match will consist of 4 overs.</li>
          <li>Only 1 bowler can bowl 1 over.</li>
          <li>Catches: Direct catches only.</li>
          <li>In case of tie, Super Over will be played.</li>
          <li>Six allowed only in the straight area.</li>
          <li>Matches will be played by knockout stages.</li>
          <li>Umpire decisions are final & arguments with umpire will lead to team disqualification. This will be strictly followed.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Contact For Further Information</h2>
        <ul className="list-disc list-inside mb-4 theme-text-secondary">
          <li>Atharv Shinde – 9579100166</li>
          <li>Harshad Patil – 7058937117</li>
        </ul>
        <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>← Return</button>
      </div>
    </div>
  );
};

export default BoxCricketDetails;
