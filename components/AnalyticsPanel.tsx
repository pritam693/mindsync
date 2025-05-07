'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

type MoodCount = { mood: string; count: number };

export default function AnalyticsPanel() {
  const [data, setData] = useState<MoodCount[]>([]);

  useEffect(() => {
    let socket: ReturnType<typeof io>;

    const fetchData = () => {
      fetch('/api/analytics')
        .then(res => res.json())
        .then(setData)
        .catch(console.error);
    };

    fetchData(); // initial load

    // subscribe to new-thought events to refresh analytics
    socket = io();
    socket.on('new-thought', () => {
      fetchData();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <aside className="fixed top-4 right-4 w-64 p-4 bg-white/10 backdrop-blur-md rounded-xl text-white">
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
