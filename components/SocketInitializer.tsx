// components/SocketInitializer.tsx
'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';

export default function SocketInitializer() {
  useEffect(() => {
    // hit the API route to spin up Socket.io on the server
    fetch('/api/socket');
  }, []);

  return null;
}
