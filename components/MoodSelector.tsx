import { useState } from 'react';

const moods = ['happy','sad','anxious','calm','angry','neutral'] as const;

interface Props { onChange: (mood: typeof moods[number]) => void }

export default function MoodSelector({ onChange }: Props) {
  const [selected, setSelected] = useState<typeof moods[number]>(moods[0]);

  return (
    <div className="flex gap-2">
      {moods.map(m => (
        <button
          key={m}
          onClick={() => { setSelected(m); onChange(m); }}
          className={`px-3 py-1 rounded-full text-sm transition ${m === selected ? 'bg-indigo-500 text-white' : 'bg-white/20 text-white'}`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
