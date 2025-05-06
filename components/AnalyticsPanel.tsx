'use client';

import { useEffect, useState } from 'react';

type MoodCount = { mood: string; count: number };

export default function AnalyticsPanel() {
  const [data, setData] = useState<MoodCount[]>([]);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <aside className="fixed top-4 right-4 w-64 p-4 bg-white/10 backdrop-blur-md rounded-xl">
      <h2 className="text-lg font-semibold mb-2">Global Mood Index</h2>
      {data.map(d => (
        <div key={d.mood} className="flex justify-between mb-1">
          <span className="capitalize">{d.mood}</span>
          <span>{d.count}</span>
        </div>
      ))}
    </aside>
  );
}
