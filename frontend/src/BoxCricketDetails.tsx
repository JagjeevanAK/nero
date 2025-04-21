import React from 'react';
import EventDetails from './components/EventDetails';
import { Trophy } from 'lucide-react';

const BoxCricketDetails: React.FC = () => (
  <EventDetails
    title="Box Cricket"
    icon={Trophy}
    accent="from-blue-500 to-purple-500"
    sections={[
      {
        title: 'Rules & Regulations',
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>
              Each team consists of 7 players (one player in only one team).
            </li>
            <li>Match will consist of 4 overs.</li>
            <li>Only 1 bowler can bowl 1 over.</li>
            <li>Catches: Direct catches only.</li>
            <li>In case of tie, Super Over will be played.</li>
            <li>Six allowed only in the straight area.</li>
            <li>Matches will be played by knockout stages.</li>
            <li>
              Umpire decisions are final & arguments with umpire will lead to
              team disqualification. This will be strictly followed.
            </li>
          </ul>
        )
      }
    ]}
    coordinator={{ name: 'Athrav Patil', phone: '7517824665', email: 'atupatil7867@gmail.com' }}
  />
);

export default BoxCricketDetails;
