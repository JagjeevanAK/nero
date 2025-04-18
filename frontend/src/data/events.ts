import { MessageCircle, Code2, Link as Linux, Ticket as Cricket } from 'lucide-react';

export const events = [
  {
    id: 1,
    title: "Group Discussion (GD)",
    icon: MessageCircle,
    fee: 80,
    description: "Showcase your communication skills, analytical thinking, and leadership in a moderated group setting.",
    requiresTeam: false
  },
  {
    id: 2,
    title: "Technical Marathon",
    icon: Code2,
    fee: 80,
    description: "Test your technical knowledge and problem-solving skills in this coding and technical challenge.",
    requiresTeam: true
  },
  {
    id: 3,
    title: "Dock The Flag",
    icon: Linux,
    fee: 80,
    description: "Put your Linux knowledge to the test in this fast-paced quiz competition about the open-source OS.",
    requiresTeam: false
  },
  {
    id: 4,
    title: "Box Cricket",
    icon: Cricket,
    fee: 400,
    description: "Experience cricket in a compact format with this exciting team sport in a limited space.",
    requiresTeam: true
  }
];