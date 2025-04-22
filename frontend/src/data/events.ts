import { MessageCircle, Terminal, Flag, Trophy, Gamepad2 } from 'lucide-react';

export const events = [
  {
    id: 1,
    title: "Prompt War",
    icon: MessageCircle,
    fee: 80,
    description: "Prompt & Paint is a creative AI art challenge where your words become brushstrokes — craft the best prompt to generate stunning AI visuals!",
    requiresTeam: false,
    accent: 'from-grey-500 to-pink-500',
    badge: 'Solo',
    badgeColor: 'bg-pink-600/80 text-white'
  },
  {
    id: 2,
    title: "Code Marathon",
    icon: Terminal,
    fee: 80,
    description: "Test your technical knowledge and problem-solving skills in this coding and technical challenge.",
    requiresTeam: true,
    accent: 'from-grey-500 to-indigo-500',
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
    accent: 'from-grey-500 to-green-500',
    badge: 'Solo',
    badgeColor: 'bg-green-600/80 text-white'
  },
  {
    id: 4,
    title: "BGMI Dominator",
    icon: Gamepad2,
    fee: 200,
    description: "Battle for Glory, Master the Arena! Join the ultimate BGMI showdown and prove your skills.",
    requiresTeam: true,
    accent: 'from-grey-500 to-red-500',
    badge: 'Team',
    badgeColor: 'bg-red-500/80 text-white'
  },
  {
    id: 5,
    title: "Box Cricket",
    icon: Trophy,
    fee: 400,
    description: "Battle for Glory, Master the Arena! Join the ultimate BGMI showdown and prove your skills.",
    requiresTeam: true,
    accent: 'from-grey-500 to-orange-500',
    badge: 'Team',
    badgeColor: 'bg-orange-500/80 text-white'
  }
];