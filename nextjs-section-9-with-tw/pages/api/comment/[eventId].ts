import fs, { readFileSync } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

import { dbPathBuild, readDbFileData } from '../../../helper/api-utils';
import { validator } from '../../../helper/validator';
const dbPathComment = dbPathBuild('comment-data.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const eventId: string | string[] = req?.query?.eventId ?? undefined;
    const { data } = readDbFileData(dbPathComment);
    const selectedComments = data.find((comment: any) => comment.eventId === eventId);

    if (req.method === '#POST') {
      const { email, name, text } = req.body;
    }
    if (req.method === '#DELETE') {
      // ...
    }

    if (req.method === 'GET') {
      return res.status(200).json({
        error: false,
        status: '200',
        message: 'Successfully reading current feedback items',
        payload: { data: selectedComments },
      });
    }
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: true, status: '500', message: e?.message ?? 'internal error', payload: { error: e } });
  }

  return res.status(404).send({ error: true, status: '404', message: 'No such method in api' });
}
