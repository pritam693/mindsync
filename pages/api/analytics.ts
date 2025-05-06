import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/db';
import Thought from '@/models/Thought';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const since = new Date(Date.now() - 86400000);
  const agg = await Thought.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: '$mood', count: { $sum: 1 } } }
  ]);
  res.status(200).json(agg.map(a => ({ mood: a._id, count: a.count })));
}
