import React from 'react';
import EventDetails from './components/EventDetails';
import { Terminal } from 'lucide-react';

const TechnicalMarathonDetails: React.FC = () => (
  <EventDetails
    title="Technical Marathon"
    icon={Terminal}
    accent="from-blue-500 to-purple-500"
    details={
      <>
        <p className="mb-2">Date: 26 April 2025</p>
        <p className="mb-6"><strong>Details:</strong> Further details related to time and venue will be shared soon.</p>
      </>
    }
    sections={[
      {
        title: '🏁 Technical Marathon – Event Description & Rules',
        children: (
          <>
            <h3 className="text-lg font-semibold mb-2">📌 Event Description</h3>
            <p className="mb-2">A multi-round technical treasure hunt involving coding, logic, and team strategy.</p>
            <p className="mb-2">Participants will progress through different levels by solving problems and uncovering clues to reach the next stage.</p>
            <div className="mb-4 p-3 rounded bg-blue-100 text-blue-900 border-l-4 border-blue-500">
              <strong>Note:</strong> All coding problems in this event will be based on the <b>C++ programming language</b>. Participants are expected to be familiar with basic to intermediate concepts of C++.
            </div>
          </>
        )
      },
      {
        title: '🧠 Round Structure',
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li className="mb-2"><b>🔹 Round 1 – MCQ Test (Screening)</b><br />Individual participants will take a technical MCQ test.<br />Based on the results, the top 40 participants will qualify for the next round.<br />These 40 will be randomly grouped into 10 teams (4 participants per team).</li>
            <li className="mb-2"><b>🔹 Round 2 – Clue Hunt (Team Round)</b><br />Each team will solve a chain of coding or logic problems.<br />Solving a problem gives a clue to the next location or task.<br />Teams will race against each other to find and solve as many clues as possible.<br />The top 6 teams with the most clues solved in the shortest time will qualify for Round 3.</li>
            <li className="mb-2"><b>🔹 Round 3 – Final Showdown</b><br />The 6 finalist teams will compete in a final, more challenging clue-solving round.<br />Based on performance, the top 2 teams will be selected.<br />The best performing team wins the Winner’s Prize; the second-best gets the Runner-Up Prize.</li>
          </ul>
        )
      },
      {
        title: '📜 General Rules',
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Solo registration only. Teams will be formed after Round 1.</li>
            <li>
              Use of mobile phones, internet, or external help is strictly
              prohibited unless specified in the problem.
            </li>
            <li>All problems must be fully solved to receive the next clue.</li>
            <li>Participants must not follow or copy other teams.</li>
            <li>
              No tampering with problems, clues, or materials not assigned to
              your team.
            </li>
            <li>
              Each team must get their solution verified by an event coordinator
              before moving ahead.
            </li>
            <li>
              Respect the event venue, volunteers, and coordinators at all
              times.
            </li>
            <li>
              In case of a tie, a bonus challenge or rapid-fire round will
              determine the winner.
            </li>
            <li>
              Any form of cheating, misbehaviour, or rule violation will result
              in immediate disqualification.
            </li>
          </ul>
        )
      },
      {
        title: '🔒 Additional Guidelines',
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>
              Time Limit: Some problems may have a strict time cap. Failing to
              solve in time may lead to penalties or limited hints.
            </li>
            <li>
              Clue Security: Do not remove, hide, or damage clues for other
              participants.
            </li>
            <li>
              Fair Play: Collaboration between different teams is not allowed.
            </li>
            <li>
              Checkpoint Validation: Problem solutions must be approved before
              receiving the next clue.
            </li>
          </ul>
        )
      }
    ]}
    coordinator={{ name: 'Gaurav Kumbhare', phone: '7768807185', email: 'kumbharegaurav100@gmail.com' }}
  />
);

export default TechnicalMarathonDetails;
