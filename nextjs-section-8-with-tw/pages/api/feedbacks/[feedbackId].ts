import fs, { readFileSync } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

import { dbPathBuild, readFeedbackData } from '../feedback';
// import { getEvents, getEventById } from '../../helper/localDb';
// import { EventType } from '../../types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  //   console.log(req.query, req.method);
  try {
    const feedbackId: string | string[] = req?.query?.feedbackId ?? '0';
    const dbFilePath = dbPathBuild(undefined);
    const feedbackData = readFeedbackData(dbFilePath);
    const selectedFeedback = feedbackData.find((feedback: any) => feedback.id === feedbackId);
    if (req.method === '#POST') {
      // ...
    }
    if (req.method === '#DELETE') {
      // ...
    }

    if (req.method === 'GET') {
      return res.status(200).json({
        error: false,
        status: '200',
        message: 'Successfully reading current feedback items',
        payload: { data: selectedFeedback },
      });
    }
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: true, status: '500', message: e?.message ?? 'internal error', payload: { error: e } });
  }

  return res.status(404).send({ error: true, status: '404', message: 'No such method in api' });
}
