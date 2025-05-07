'use client';

import { useState } from 'react';
import MoodSelector from './MoodSelector';

interface Props {
  onSubmit: (text: string, mood: string) => void;
  onCancel: () => void;
}

export default function SubmitModal({ onSubmit, onCancel }: Props) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState<'happy'|'sad'|'anxious'|'calm'|'angry'|'neutral'>('happy');

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md max-w-md w-full">
        <h3 className="text-xl mb-2">Share your thought</h3>
        <textarea
          rows={3}
          maxLength={200}
          className="w-full p-2 rounded-md bg-white/20 text-white mb-2"
          placeholder="One thought per day..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <MoodSelector onChange={setMood} />
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 rounded-full hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(text, mood)}
            className="px-4 py-2 bg-indigo-500 rounded-full hover:bg-indigo-600 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
