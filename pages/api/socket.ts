import { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

// Initialize Socket.io on the Next.js server
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Next.js stores the Node HTTP server on res.socket.server
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const httpServer = (res.socket as any).server as HTTPServer;

  // Create new Socket.io server if none exists
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(httpServer as any).io) {
    const io = new IOServer(httpServer);
    // Attach to the server so we don't recreate on every call
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (httpServer as any).io = io;
  }
  res.end();
}
