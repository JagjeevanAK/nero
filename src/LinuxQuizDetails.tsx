import React from 'react';
import { useNavigate } from 'react-router-dom';

const LinuxQuizDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-3xl glass-card rounded-2xl flex flex-col gap-6 p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Quizeme Linux</h1>
        <p className="mb-2">Date: To Be Announced</p>
        <p className="mb-6"><strong>Details:</strong> Further details related to time and venue will be shared soon.</p>
        <h2 className="text-xl font-semibold mb-2">Overall Flow of the Event</h2>
        <ol className="list-decimal list-inside mb-4 theme-text-secondary space-y-2">
          <li>
            <strong>Workshop (Learning & Engagement Phase)</strong>
            <ul className="list-disc list-inside ml-6">
              <li>Objective: Introduce participants to fundamental Linux concepts, command-line usage, and real-world cybersecurity basics.</li>
              <li>Duration: 1.5 – 2 hours</li>
              <li>Format: Hands-on tutorial, Live demonstrations, Interactive Q&A</li>
              <li>Topics Covered: Linux file system, permissions, user management, useful Linux commands, cybersecurity basics (file hiding, process monitoring, etc.)</li>
            </ul>
          </li>
          <li>
            <strong>Quiz Round</strong>
            <ul className="list-disc list-inside ml-6">
              <li>Objective: Test participants’ Linux & security knowledge in the most engaging and innovative way.</li>
              <li>Structure: 8 Unique Types of Questions, 5 Questions per Type (Total = 40 questions), 1 Minute Per Question, Real-Time Leaderboard Displayed</li>
              <li>Types of Rounds: Scenario-Based, Puzzle & Riddle, Time-Limited, Visual/Audio, Flash Rounds, Spot-the-Mistake, Mystery Flag, Gamified Streaks</li>
              <li>Rules: No external help, Top scorers qualify for DockTheFlag, Tie-breaker by time, Suspicious behavior leads to disqualification</li>
            </ul>
          </li>
          <li>
            <strong>Final Round – "DockTheFlag" (The Ultimate Cyber Challenge)</strong>
            <ul className="list-disc list-inside ml-6">
              <li>Objective: Test participants’ practical skills in a simulated Linux environment.</li>
              <li>Format: CTF-style but guided, 8 Challenge Stages in a custom Docker environment, Answers submitted on a web interface</li>
              <li>Challenge Types: Finding hidden files, Decoding text, Exploring misconfigured systems, Cracking light challenges (steganography, sudo misuses, etc.)</li>
              <li>Rules: No internet allowed (besides the event website), Pre-built Docker image provided, Solve each level to unlock the next, Time-based scoring (faster = higher score)</li>
              <li>Winner Criteria: Most flags captured, Least time taken</li>
            </ul>
          </li>
        </ol>
        <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>
          ← Return
        </button>
      </div>
    </div>
  );
};

export default LinuxQuizDetails;
