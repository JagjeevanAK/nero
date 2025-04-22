import React from "react";
import EventDetails from "../components/EventDetails";
import { Gamepad2 } from "lucide-react";

const BGMIDetails: React.FC = () => (
  <EventDetails
    title="BGMI Dominator"
    icon={Gamepad2}
    accent="from-blue-500 to-purple-500"
    details={
      <>
        <p className="mb-2">Date: 30 April 2025</p>
        <p className="mb-6">
          A high-octane competitive eSports event for BGMI enthusiasts! Form your squad, lock and load, and battle it out to become the ultimate dominator.
        </p>
      </>
    }
    sections={[
      {
        title: "Team Format",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Team Squad Battle (4 players per team)</li>
            <li>Custom room matches</li>
            <li>Map and game mode details will be announced in advance</li>
          </ul>
        )
      },
      {
        title: "Rules & Regulations",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Players must join the room 10 minutes prior to the match start time.</li>
            <li>All players in the squad must be registered; substitutes require pre-registration.</li>
            <li>Suspicious activity (e.g., cheating, account sharing) leads to immediate disqualification.</li>
            <li>Unfair means (aimbots, trigger bots, ESPs) are strictly prohibited.</li>
            <li>Use of any game-modifying tool will result in disqualification.</li>
            <li>Only in-game voice chat is permitted during gameplay.</li>
            <li>Organizers are not responsible for participants’ internet connectivity issues.</li>
            <li>Entry fees are non-refundable under any circumstances.</li>
            <li>The latest updated version of BGMI must be used.</li>
            <li>Participants must carry their ID cards for verification.</li>
          </ul>
        )
      }
    ]}
    coordinator={{
      name: "Kushal Ambi",
      phone: "9423267007",
      email: "kushalambi14@gmail.com",
    }}
  />
);

export default BGMIDetails;
