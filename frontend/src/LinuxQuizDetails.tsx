import React from 'react';
import EventDetails from './components/EventDetails';
import { Flag } from 'lucide-react';

const LinuxQuizDetails: React.FC = () => (
  <EventDetails
    title="Dock The Flag"
    icon={Flag}
    accent="from-blue-500 to-purple-500"
    details={
      <p className="mb-2 text-center">Date: 26 April 2025</p>
    }
    sections={[
      {
        title: '🧩 DockTheFlag – Event Flow',
        children: (
          <>
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
          </>
        )
      }
    ]}
    coordinator={{ name: 'Rakesh Yadhav', phone: '9404899768', email: 'raxlord19@gmail.com' }}
  />
);

export default LinuxQuizDetails;
