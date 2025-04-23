import React from 'react';
import EventDetails from '../components/EventDetails';
import { MessageCircle } from 'lucide-react';

const PromptWarDetails: React.FC = () => (
  <EventDetails
    title="Prompt War"
    icon={MessageCircle}
    accent="from-blue-500 to-purple-500"
    sections={[
      {
        
        children: (
          <p className="list-disc list-inside mb-4 theme-text-secondary">
          Put your creativity to the test—craft AI art prompts on the spot in solo and team rounds. May the best prompt win!
        </p>
        )
      },
      {
        title: "General Guidelines",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>The event is open to all registered participants.</li>
            <li>College identity is mandatory for participation and verification.</li>
            <li>Participants must arrive at least 10 minutes early.</li>
            <li>Mobile phones and electronic devices must be switched off during rounds.</li>
          </ul>
        )
      },
      {
        title: "Rules of the Discussion",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Prompts must be original and created on the spot.</li>
            <li>No editing or post-processing of generated images is allowed.</li>
            <li>One prompt submission per participant per round.</li>
            <li>Use of pre-generated or AI-suggested prompts is not permitted.</li>
            <li>Plagiarism or offensive content results in immediate disqualification.</li>
          </ul>
        )
      },
      {
        title: "Event Rounds & Variants",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Speed Round: 5 minutes to craft the most effective prompt.</li>
            <li>Themed Round: constraints like “Only 20 words”, “Include a dragon and a coffee cup”, or “Describe without colors”.</li>
            <li>Team Round: Teams of 2–3 brainstorm and submit a single prompt.</li>
          </ul>
        )
      },
      {
        title: "Recognition & Rewards",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Winner & Runner-up based on combined scores from all rounds.</li>
            <li>Special titles like “Prompt Poet” or “Visual Whisperer”.</li>
            <li>Certificates and prizes for finalists; participation certificates for all.</li>
          </ul>
        )
      },
      {
        title: "Event Format",
        children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>Participants are briefed and given the topic.</li>
            <li>They have 10–15 minutes to craft their prompt.</li>
            <li>Prompts are submitted to the AI tool by organizers.</li>
            <li>Generated images displayed anonymously for fair judgment.</li>
            <li>Judges or audience vote based on defined criteria.</li>
          </ul>
        )
      }
    ]}
    coordinator={{ name: 'Tejas Narute', phone: '7517055941', email: 'tejasnarute04@gmail.com' }}
  />
);

export default PromptWarDetails;
