import React from 'react';
import EventDetails from '../components/EventDetails';
import { Flag } from 'lucide-react';

const LinuxQuizDetails: React.FC = () => (
  <EventDetails
    title="Dock The Flag"
    icon={Flag}
    accent="from-blue-500 to-purple-500"
    details={
      <>
        <p className="mb-2">Date: 30 April 2025</p>
        <p className="mb-6">
          Kickstart your Linux security skills with hands-on workshops, a fast-paced quiz, and a CTF-style final challenge.
        </p>
      </>
    }
    sections={[
      {
        title: "Workshop: Learning & Engagement",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li><strong>Duration:</strong> 1.5 – 2 hours</li>
            <li><strong>Objective:</strong> Build a strong foundation in Linux and cybersecurity concepts.</li>
            <li><strong>Format:</strong>
              <ul className="list-disc list-inside ml-6">
                <li>Hands-on tutorials</li>
                <li>Live demonstrations</li>
                <li>Interactive Q&A sessions</li>
              </ul>
            </li>
            <li><strong>Topics Covered:</strong>
              <ul className="list-disc list-inside ml-6">
                <li>Linux file system, permissions, and user management</li>
                <li>Essential Linux commands for system exploration</li>
                <li>Cybersecurity basics: file hiding and process monitoring</li>
              </ul>
            </li>
          </ul>
        )
      },
      {
        title: "Quiz Round: Linux & Security Showdown",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li><strong>Objective:</strong> Test theoretical and practical knowledge in a fast-paced quiz.</li>
            <li><strong>Structure:</strong>
              <ul className="list-disc list-inside ml-6">
                <li>8 question types, 40 total questions</li>
                <li>1 minute per question with real-time leaderboard</li>
              </ul>
            </li>
            <li><strong>Round Types:</strong>
              <ul className="list-disc list-inside ml-6">
                <li>Scenario-Based</li>
                <li>Puzzles & Riddles</li>
                <li>Visual & Audio Challenges</li>
                <li>Flash Rounds & Mystery Flags</li>
              </ul>
            </li>
            <li><strong>Rules:</strong> No external help; tie-breaker by time; suspicious behavior disqualifies.</li>
          </ul>
        )
      },
      {
        title: "Final Round: CTF Challenge",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li><strong>Objective:</strong> Hands-on CTF in a Docker environment with 8 escalating challenges.</li>
            <li><strong>Format:</strong>
              <ul className="list-disc list-inside ml-6">
                <li>CTF-style competition</li>
                <li>Answers submitted via web interface</li>
              </ul>
            </li>
            <li><strong>Challenge Types:</strong> Hidden files, text decoding, exploit tasks, steganography.</li>
            <li><strong>Scoring & Rules:</strong> Internet restricted, one level unlocks next, time-based scoring.</li>
            <li><strong>Winner Criteria:</strong> Most flags captured and least time taken.</li>
          </ul>
        )
      }
    ]}
    coordinator={{ name: 'Rakesh Yadhav', phone: '9404899768', email: 'raxlord19@gmail.com' }}
  />
);

export default LinuxQuizDetails;
