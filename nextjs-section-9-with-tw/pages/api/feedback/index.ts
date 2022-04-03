import fs, { readFileSync } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { getEvents, getEventById } from '../../helper/localDb';
// import { EventType } from '../../types/types';

export const dbPath = path.join(process.cwd(), 'db', 'feedback-data.json');

export function dbPathBuild(fileName: string | undefined) {
  if (!fileName) {
    return dbPath;
  }

  return path.join(process.cwd(), 'db', fileName);
}

export const readFeedbackData = (dbPath: any) => {
  const fileData = readFileSync(dbPath, 'utf8');
  const data = JSON.parse(fileData);
  return data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  //   console.log(req.query, req.method);
  if (req.method === 'POST') {
    const { email, text, eventId } = req.body;
    const newFeedback = {
      id: new Date().toISOString(),
      eventId,
      email,
      text,
    };

    const filePath = dbPath;
    try {
      //   const fileData = readFileSync(filePath, 'utf8');
      //   const data = JSON.parse(fileData);
      const data = readFeedbackData(filePath);
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
  if (req.method === 'GET') {
    const filePath = dbPath;
    const eventId = req?.query?.eventId ?? '0';

    try {
      const fileData = readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileData);

      const dataToRes = data.filter((el: any) => el.eventId === eventId);

      return res.status(200).json({
        error: false,
        status: '200',
        message: 'Successfully reading current feedback items',
        payload: { data: dataToRes },
      });
    } catch (e: any) {
      return res
        .status(500)
        .json({ error: true, status: '500', message: e?.message ?? 'internal error', payload: { error: e } });
    }
  }
  return res.status(404).send({ error: true, status: '404', message: 'No such method in api' });
}
