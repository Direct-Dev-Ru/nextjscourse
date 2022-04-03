// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getEvents } from '../../helper/localDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const eventsData = await getEvents();
  res.status(200).json(eventsData);
}
