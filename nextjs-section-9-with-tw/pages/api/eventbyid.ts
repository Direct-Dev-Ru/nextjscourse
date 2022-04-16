// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getEvents, getEventById } from '../../helper/localDb';
import { EventType } from '../../types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  //   console.log(req.query, req.method);
  if (req.method === 'GET') {
    const eventId: string = (req.query?.eventId ?? '0') as 'string';
    const event: EventType = (await getEventById(eventId)) as EventType;
    return res.status(200).json({ error: false, status: '200', message: 'Success', payload: { event } });
  }

  return res.status(404).send({ error: true, status: '404', message: 'No such method in api' });
}
