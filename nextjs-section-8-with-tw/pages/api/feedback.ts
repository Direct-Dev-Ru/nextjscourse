import fs, { readFileSync } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { getEvents, getEventById } from '../../helper/localDb';
// import { EventType } from '../../types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  //   console.log(req.query, req.method);
  if (req.method === 'POST') {
    const { email, text } = req.body;
    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    const filePath = path.join(process.cwd(), 'db', 'feedback-data.json');
    try {
      const fileData = readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileData);
      data.push(newFeedback);
      fs.writeFileSync(filePath, JSON.stringify(data));

      return res
        .status(201)
        .json({ error: false, status: '201', message: 'Successfully added feedback', payload: { newFeedback } });
    } catch (e: any) {
      return res
        .status(500)
        .json({ error: true, status: '500', message: e?.message ?? 'internal error', payload: { error: e } });
    }
  }

  return res.status(404).send({ error: true, status: '404', message: 'No such method in api' });
}
