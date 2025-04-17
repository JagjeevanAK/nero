import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BoxCricketDetails: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-3xl glass-card rounded-2xl flex flex-col gap-6 p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-2 gradient-text text-center" style={{backgroundImage: 'linear-gradient(90deg, #4f3bc0, #0066ff, #FF28A9, #D12DFF, #7C3DF2, #3F45F2, #00CFFF, #00FFB8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'}}>Box Cricket</h1>
        <h2 className="text-xl font-semibold mb-2 text-center">Rules & Regulations</h2>
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
          <li>Event Coordinator: Athrav Patil </li>
          <li>Contact No: 7517824665</li>
          <li>Email: atupatil7867@gmail.com</li>
        </ul>

        <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>
          ← Return
        </button>
      </div>
    </div>
  );
};

export default BoxCricketDetails;
