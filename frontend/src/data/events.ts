import { MessageCircle, Terminal, Flag, Trophy } from 'lucide-react';

export const events = [
  {
    id: 1,
    title: "Group Discussion (GD)",
    icon: MessageCircle,
    fee: 80,
    description: "Showcase your communication skills, analytical thinking, and leadership in a moderated group setting.",
    requiresTeam: false,
    accent: 'from-pink-500 to-purple-500',
    badge: 'Solo',
    badgeColor: 'bg-pink-600/80 text-white'
  },
  {
    id: 2,
    title: "Technical Marathon",
    icon: Terminal,
    fee: 80,
    description: "Test your technical knowledge and problem-solving skills in this coding and technical challenge.",
    requiresTeam: true,
    accent: 'from-blue-500 to-indigo-500',
    badge: 'Solo',
    badgeColor: 'bg-blue-600/80 text-white'
  },
  {
    id: 3,
    title: "Dock The Flag",
    icon: Flag,
    fee: 80,
    description: "Put your Linux knowledge to the test in this fast-paced quiz competition about the open-source OS.",
    requiresTeam: false,
    accent: 'from-green-400 to-blue-500',
    badge: 'Solo',
    badgeColor: 'bg-green-600/80 text-white'
  },
  {
    id: 4,
    title: "Box Cricket",
    icon: Trophy,
    fee: 400,
    description: "Experience cricket in a compact format with this exciting team sport in a limited space.",
    requiresTeam: true,
    accent: 'from-yellow-400 to-orange-500',
    badge: 'Team',
    badgeColor: 'bg-yellow-500/80 text-white'
  }
];