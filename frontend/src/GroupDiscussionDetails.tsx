import React from 'react';
import EventDetails from './components/EventDetails';
import { MessageCircle } from 'lucide-react';

const GroupDiscussionDetails: React.FC = () => (
  <EventDetails
    title="Group Discussion"
    icon={MessageCircle}
    accent="from-blue-500 to-purple-500"
    details={
      <>
        <p className="mb-2">30 April 2025</p>
        <p className="mb-6"><strong>Details:</strong> Further details related to time will be shared soon.</p>
      </>
    }
    sections={[
      { title: '1. General Guidelines', children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>The event is open to all registered participants.</li>
            <li>College Identity is Mandatory</li>
            <li>
              Participants must be present at the venue 10 minutes before the
              scheduled time.
            </li>
            <li>
              Mobile phones and any other electronic devices must be switched
              off during the discussion.
            </li>
          </ul>
        )
      },
      { title: '2. Group Formation & Topics', children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>
              Participants will be divided into groups of 8-10 members based on
              the number of entries.
            </li>
            <li>Topics will be given on the spot by the judge/moderator.</li>
            <li>
              The topic will be different for each group, but the difficulty
              level will be the same.
            </li>
          </ul>
        )
      },
      { title: '3. Rules of the Discussion', children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>
              Each group will have 2 minutes for spontaneous preparation and a
              discussion duration of 10 minutes.
            </li>
            <li>
              A moderator will oversee the discussion and ensure smooth
              proceedings.
            </li>
            <li>Participants must speak in English.</li>
            <li>
              Each participant must contribute meaningfully without interrupting
              others.
            </li>
            <li>
              Use of offensive language, personal attacks, or disrespectful
              behaviour will lead to disqualification by the moderator.
            </li>
            <li>
              Participants should not carry notes; spontaneous discussion is
              encouraged.
            </li>
          </ul>
        )
      },
      { title: '4. Evaluation Criteria', children: (
          <p className="mb-4 theme-text-secondary">Evaluation criteria will be decided by the judge/moderator.</p>
        )
      },
      { title: '5. Results & Awards', children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>The decision of the judges will be final and binding.</li>
            <li>
              Winners and runners-up will be announced at the end of the event.
            </li>
            <li>
              Certificates and prizes will be awarded as per the event
              structure.
            </li>
            <li>
              Every participant will receive a certificate at the end of the
              event.
            </li>
          </ul>
        )
      },
      { title: '6. Miscellaneous', children: (
          <ul className="list-disc list-inside mb-4 theme-text-secondary">
            <li>
              AISA (Artificial Intelligence and Data Science Students
              Association) reserves the right to amend rules if necessary.
            </li>
            <li>
              In case of disputes, the decision of the event coordinator will be
              final.
            </li>
          </ul>
        )
      }
    ]}
    coordinator={{ name: 'Tejas Narute', phone: '7517055941', email: 'tejasnarute04@gmail.com' }}
  />
);

export default GroupDiscussionDetails;
