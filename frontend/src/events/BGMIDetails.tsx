import React from "react";
import EventDetails from "../components/EventDetails";
import { Trophy } from "lucide-react";

const BGMIDetails: React.FC = () => (
  <EventDetails
    title="BGMI"
    icon={Trophy}
    accent="from-blue-500 to-purple-500"
    sections={[
      {
        title: "Rules & Regulations",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>
              The player should join the room 10 min prior to the match time.
            </li>
            <li>
              All the players in the squad should be in the registered list.
            </li>
            <li>
              Any suspicious activity detected then the squad will be
              disqualified.
            </li>
            <li>
              Any use of unfair means such as aimbot, trigger bot, ESP and other
              then the squadwill be disqualified.
            </li>
            <li>Any game modifying tool is not allowed.</li>
            <li>Only in game voice chat should be used while playing.</li>
            <li>
              Side organizers would not be held responsible for the connectivity
              issue of the participant's.
            </li>
            <li>The entry fee will not be refunded under any circumstances.</li>
            <li>The BGMI app must be in its updated version</li>
            <li>Participants should carry their id cards</li>
          </ul>
        ),
      },
    ]}
    coordinator={{
      name: "Kushal Ambi",
      phone: "9423267007",
      email: "kushalambi14@gmail.com",
    }}
  />
);

export default BGMIDetails;
