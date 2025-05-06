import type { NextApiRequest, NextApiResponse } from 'next';
import Thought, { IThought } from '@/models/Thought';
import { connectToDatabase } from '@/lib/db';

type Data =
  | { message: string }
  | IThought[]
  | IThought;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();

  // ————————————————————————————————————————————————
  // GET /api/thought
  // Returns all thoughts still alive (Mongo TTL auto-expires after 24h)
  // ————————————————————————————————————————————————
  if (req.method === 'GET') {
    try {
      const thoughts = await Thought.find()
        .sort({ createdAt: 1 })
        .lean();
      return res.status(200).json(thoughts as unknown as IThought[]);
    } catch (err) {
      console.error('GET /api/thought error', err);
      return res
        .status(500)
        .json({ message: 'Error fetching thoughts' });
    }
  }

  // ————————————————————————————————————————————————
  // POST /api/thought
  // Create a new thought, then broadcast via Socket.io
  // ————————————————————————————————————————————————
  if (req.method === 'POST') {
    try {
      const { text, mood, deviceId } = req.body;
      // TODO: one-thought-per-day enforcement via deviceId + date

      const thought = await Thought.create({ text, mood });

      // Emit via Socket.io
      interface SocketWithIO {
        server: {
          io: {
            emit: (event: string, ...args: unknown[]) => void;
          };
        };
      }
      const io = (res.socket as unknown as SocketWithIO).server.io;
      if (io) {
        io.emit('new-thought', thought);
      }

      return res.status(201).json(thought);
    } catch (err) {
      console.error('POST /api/thought error', err);
      return res
        .status(500)
        .json({ message: 'Error saving thought' });
    }
  }

  // ————————————————————————————————————————————————
  // Method Not Allowed
  // ————————————————————————————————————————————————
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
