'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ThoughtBubble from '@/components/ThoughtBubble';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import SubmitModal from '@/components/SubmitModal';
import { IThought } from '@/models/Thought';
import Image from 'next/image';

let socket: ReturnType<typeof io>;

export default function Home() {
  const [thoughts, setThoughts] = useState<IThought[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 1) Hydrate existing thoughts
    fetch('/api/thought')
      .then(res => res.json())
      .then((existing: IThought[]) => {
        setThoughts(existing);
      })
      .catch(console.error);

    // 2) Then open WebSocket for new ones
    socket = io();
    socket.on('new-thought', (t: IThought) => {
      setThoughts(prev => [...prev, t]);
    });

    // 3) Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (text: string, mood: string) => {
    const deviceId =
      localStorage.getItem('deviceId') || crypto.randomUUID();
    localStorage.setItem('deviceId', deviceId);

    await fetch('/api/thought', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, mood, deviceId }),
    });
    setShowModal(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-indigo-900">
        <div className="absolute top-4 left-4">
        <Image
          src="/mind-sync-logo.svg"
          alt="MindSync Logo"
          width={90}
          height={90}
          className="opacity-90 hover:opacity-100 transition"
        />
      </div>
      <AnalyticsPanel />
      {thoughts.map(t => (
        <ThoughtBubble key={String(t._id)} thought={t} />
      ))}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-indigo-500 p-4 rounded-full shadow-lg"
      >
        +
      </button>
      {showModal && <SubmitModal onSubmit={handleSubmit} />}
    </div>
  );
}
