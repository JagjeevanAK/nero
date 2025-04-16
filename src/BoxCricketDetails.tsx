import React from 'react';
import { useNavigate } from 'react-router-dom';

const BoxCricketDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-6xl glass-card rounded-2xl flex flex-col md:flex-row gap-10 p-6 md:p-12">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2 gradient-text">Box Cricket</h1>
          <p className="mb-2">Date: To Be Announced</p>
          <p className="mb-6"><strong>Details:</strong> Further details related to time and venue will be shared soon.</p>
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
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-2">Contact For Further Information</h2>
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Atharv Shinde – 9579100166</li>
            <li>Harshad Patil – 7058937117</li>
          </ul>
          <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>
            ← Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxCricketDetails;
