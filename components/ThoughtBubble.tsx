'use client';

import { motion } from 'framer-motion';
import { IThought } from '@/models/Thought';

interface Props { thought: IThought }

const moodColors: Record<IThought['mood'], string> = {
  happy:    'bg-green-400 ring-green-600',
  sad:      'bg-blue-500 ring-blue-700',
  anxious:  'bg-yellow-400 ring-yellow-600',
  calm:     'bg-teal-400 ring-teal-600',
  angry:    'bg-red-500 ring-red-700',
  neutral:  'bg-gray-400 ring-gray-600',
};

const SPREAD = 500;

function randOffset() {
  // Increase spread so bubbles start farther from center
  return (Math.random() - 0.5) * SPREAD;
}

export default function ThoughtBubble({ thought }: Props) {
  const colorClasses = moodColors[thought.mood] || moodColors.neutral;

  return (
    <motion.div
      style={{ top: '50%', left: '50%' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.85, x: randOffset(), y: randOffset() }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={
        `absolute rounded-full p-4 max-w-xs text-white
         ${colorClasses}
         bg-opacity-75 ring-2
         backdrop-blur-md
         cursor-pointer`
      }
    >
      <p className="text-sm">{thought.text}</p>
    </motion.div>
  );
}
