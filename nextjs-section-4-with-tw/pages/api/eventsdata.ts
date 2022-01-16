// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllEvents, DummyData } from './dummy-data';

const eventsData: DummyData[] = getAllEvents();


export default function handler(req: NextApiRequest, res: NextApiResponse<DummyData[]>) {
  res.status(200).json(eventsData);
}
