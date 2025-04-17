import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LinuxQuizDetails: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen theme-bg theme-text py-8 px-2 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-3xl glass-card rounded-2xl flex flex-col gap-6 p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-2 gradient-text text-center" style={{backgroundImage: 'linear-gradient(90deg, #4f3bc0, #0066ff, #FF28A9, #D12DFF, #7C3DF2, #3F45F2, #00CFFF, #00FFB8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'}}>Dock The Flag</h1>
        <p className="mb-2 text-center">Date: 26 April 2025</p>
        <h2 className="text-xl font-semibold mb-2">🧩 DockTheFlag – Event Flow</h2>
        <h3 className="text-lg font-semibold mb-2">🛠️ Workshop: Learning & Engagement Phase</h3>
        <ul className="list-disc list-inside mb-2 theme-text-secondary">
          <li><b>⏱️ Duration:</b> 1.5 – 2 hours</li>
          <li><b>🎯 Objective:</b> Build a strong foundation in Linux and cybersecurity concepts.</li>
          <li><b>📚 Format:</b>
            <ul className="list-disc list-inside ml-6">
              <li>Hands-on tutorials</li>
              <li>Live demonstrations</li>
              <li>Interactive Q&A sessions</li>
            </ul>
          </li>
          <li><b>🔍 Topics Covered:</b>
            <ul className="list-disc list-inside ml-6">
              <li>Linux file system structure, permissions, and user management</li>
              <li>Useful Linux commands for system exploration</li>
              <li>Cybersecurity basics like file hiding and process monitoring</li>
            </ul>
          </li>
        </ul>
        <h3 className="text-lg font-semibold mb-2">🧠 Quiz Round: Linux & Security Showdown</h3>
        <ul className="list-disc list-inside mb-2 theme-text-secondary">
          <li><b>🎯 Objective:</b> Test your theoretical and practical knowledge in a fast-paced quiz format.</li>
          <li><b>📊 Structure:</b>
            <ul className="list-disc list-inside ml-6">
              <li>8 unique types of questions</li>
              <li>5 questions per type (40 total)</li>
              <li>1 minute per question</li>
              <li>Real-time leaderboard display</li>
            </ul>
          </li>
          <li><b>🌀 Round Types:</b>
            <ul className="list-disc list-inside ml-6">
              <li>Scenario-Based Questions</li>
              <li>Puzzle & Riddle Challenges</li>
              <li>Time-Limited Concept Tasks</li>
              <li>Visual & Audio Challenges</li>
              <li>Flash Rounds (30-sec pop-ups)</li>
              <li>Spot-the-Mistake (find the flaw)</li>
              <li>Mystery Flag (solve clues)</li>
              <li>Gamified Streaks (bonus for streaks)</li>
            </ul>
          </li>
          <li><b>⚠️ Rules:</b>
            <ul className="list-disc list-inside ml-6">
              <li>Strictly no external help</li>
              <li>Top scorers proceed to final round</li>
              <li>Tie-breaker: Time taken</li>
              <li>Any suspicious behavior = disqualification</li>
            </ul>
          </li>
        </ul>
        <h3 className="text-lg font-semibold mb-2">🚩 Final Round: "DockTheFlag" – The Ultimate Cyber Challenge</h3>
        <ul className="list-disc list-inside mb-2 theme-text-secondary">
          <li><b>🎯 Objective:</b> Hands-on test in a real Linux-based CTF environment.</li>
          <li><b>⚙️ Format:</b>
            <ul className="list-disc list-inside ml-6">
              <li>Guided CTF-style competition</li>
              <li>8 escalating challenges in a Docker environment</li>
              <li>Answers submitted through a web interface</li>
            </ul>
          </li>
          <li><b>🧩 Challenge Types:</b>
            <ul className="list-disc list-inside ml-6">
              <li>Hidden file discovery</li>
              <li>Text decoding</li>
              <li>System misconfiguration exploitation</li>
              <li>Light CTF tasks (e.g., steganography, sudo misuse)</li>
            </ul>
          </li>
          <li><b>⚠️ Rules:</b>
            <ul className="list-disc list-inside ml-6">
              <li>Internet restricted to the event platform</li>
              <li>Pre-built Docker image provided</li>
              <li>Solving one level unlocks the next</li>
              <li>Time-based scoring</li>
            </ul>
          </li>
          <li><b>🏆 Winner Criteria:</b>
            <ul className="list-disc list-inside ml-6">
              <li>Most flags captured</li>
              <li>Least time taken</li>
            </ul>
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Contact For Further Information</h2>
        <ul className="list-disc list-inside mb-4 theme-text-secondary">
          <li>Event Coordinator: Rakesh Yadhav  </li>
          <li>Contact No: 9404899768</li>
          <li>Email: raxlord19@gmail.com</li>
        </ul>

        <button className="mt-8 w-full btn-primary" style={{background: 'linear-gradient(to right, #2563eb, #4f46e5)'}} onClick={() => navigate(-1)}>
          ← Return
        </button>
      </div>
    </div>
  );
};

export default LinuxQuizDetails;
