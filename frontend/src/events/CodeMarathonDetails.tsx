import React from 'react';
import EventDetails from '../components/EventDetails';
import { Terminal } from 'lucide-react';

const CodeMarathonDetails: React.FC = () => (
  <EventDetails
    title="Code Marathon"
    icon={Terminal}
    accent="from-blue-500 to-purple-500"
    details={
      <>
        <p className="mb-2">Date: 30 April 2025</p>
        <p className="mb-6">
          A multi-round technical treasure hunt involving coding, logic, and team strategy. Participants will progress through different levels by solving problems and uncovering clues to reach the next stage.
        </p>
      </>
    }
    sections={[
      {
        title: 'Event Overview',
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>A multi-round technical treasure hunt involving coding, logic, and team strategy.</li>
            <li>Progress through different levels by solving problems and uncovering clues.</li>
            <li>All coding problems will be based on the C++ programming language.</li>
          </ul>
        )
      },
      {
        title: 'Round Structure',
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li><strong>Round 1 – MCQ Test (Screening):</strong> Individual participants take a technical MCQ test. Top 40 qualify.</li>
            <li><strong>Round 2 – Clue Hunt (Team Round):</strong> Teams of 4 solve chains of coding or logic problems to earn clues.</li>
            <li><strong>Round 3 – Final Showdown:</strong> Top 6 teams compete in a final clue-solving round to win prizes.</li>
          </ul>
        )
      },
      {
        title: 'General Rules',
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Solo registration only.</li>
            <li>Teams form after Round 1.</li>
            <li>No external help, mobile phones, or internet allowed unless specified.</li>
            <li>Solutions must be verified by an event coordinator before progressing.</li>
            <li>Respect volunteers and follow instructions; misconduct leads to disqualification.</li>
          </ul>
        )
      },
      {
        title: 'Additional Guidelines',
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Some problems may have strict time limits and penalties for delays.</li>
            <li>Do not tamper with clues, materials, or other teams’ work.</li>
            <li>Tie-breakers will be decided by a bonus challenge or rapid-fire round.</li>
          </ul>
        )
      },
    ]}
    coordinator={{ name: 'Gaurav Kumbhare', phone: '7768807185', email: 'kumbharegaurav100@gmail.com' }}
  />
);

export default CodeMarathonDetails;
