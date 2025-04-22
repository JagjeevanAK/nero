import React from "react";
import EventDetails from "../components/EventDetails";
import { Gamepad2 } from "lucide-react";

const BoxCricketDetails: React.FC = () => (
    <EventDetails
        title="Box Cricket"
        icon={Gamepad2}
        accent="from-blue-500 to-purple-500"
        details={
          <>
            <p className="mb-2">
              Fast-paced cricket. Tight boundaries. Only one team will lift the trophy! Bring your squad and swing for glory.
            </p>
          </>
        }
        sections={[
          {
            title: "Team Composition",
            children: (
              <ul className="list-disc list-inside mb-2 theme-text-secondary">
                <li>Each team must have 7 players</li>
                <li>One player can participate in only one team</li>
              </ul>
            ),
          },
          {
            title: "Match Format",
            children: (
              <ul className="list-disc list-inside mb-2 theme-text-secondary">
                <li>Each match consists of 4 overs per side</li>
                <li>1 over per bowler (No bowler can bowl more than once)</li>
              </ul>
            ),
          },
          {
            title: "Gameplay Rules",
            children: (
              <ul className="list-disc list-inside mb-2 theme-text-secondary">
                <li>Only direct catches are considered valid</li>
                <li>Sixes are allowed only in the straight area</li>
                <li>All matches will be played in knockout format</li>
                <li>In case of a tie, a Super Over will decide the winner</li>
              </ul>
            ),
          },
          {
            title: "Code of Conduct",
            children: (
              <ul className="list-disc list-inside mb-2 theme-text-secondary">
                <li>The umpire’s decision is final</li>
                <li>Any misconduct with the umpire will lead to team disqualification</li>
                <li>This rule will be strictly enforced</li>
              </ul>
            ),
          },
        ]}
        coordinator={{
            name: "Athrva Patil",
            phone: "7517824665",
            email: "atupatil7867@gmail.com",
        }}
    />
);

export default BoxCricketDetails;
