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
      if (!validator('email', email)) {
        return res
          .status(422)
          .json({ error: true, status: '422', message: 'email validation error', payload: { email } });
      }
      if (!validator('name', name)) {
        return res.status(422).json({
          error: true,
          status: '422',
          message: 'name validation error: only letters from 3 and more ...',
          payload: { name },
        });
      }
      //   if in text var thera are tags - break ...
      const findTags = validator('custom', text, /(<([^>]+)>)/gi);
      if (findTags) {
        return res.status(422).json({
          error: true,
          status: '422',
          message: 'text validation error: some tags find',
          payload: { findTags },
        });
      }
    }
    if (req.method === '#DELETE') {
      // ...
    }

    if (req.method === 'GET') {
      return res.status(200).json({
        error: false,
        status: '200',
        message: 'Successfully reading comments for event with id = ' + eventId,
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
