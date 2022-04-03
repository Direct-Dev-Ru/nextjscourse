import fs, { readFileSync } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbPathBuild, readDbFileData } from '../../../helper/api-utils';
import { validator } from '../../../helper/validator';
const dbPathNewsletter = dbPathBuild('newsletter-data.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    const userEmail: string | undefined = req?.body?.email ?? undefined;

    if (!validator('email', userEmail)) {
      return res
        .status(422)
        .json({ error: true, status: '422', message: 'validation error', payload: { email: userEmail } });
    }

    const newSubscribtion = {
      id: new Date().toISOString(),
      userEmail,
    };

    try {
      const data = readDbFileData(dbPathNewsletter);
      data.push(newSubscribtion);
      fs.writeFileSync(dbPathNewsletter, JSON.stringify(data));

      return res.status(201).json({
        error: false,
        status: '201',
        message: 'Successfully added newsletter subscribtion',
        payload: { newSubscribtion },
      });
    } catch (e: any) {
      return res
        .status(500)
        .json({ error: true, status: '500', message: e?.message ?? 'internal error', payload: { error: e } });
    }
  }

  if (req.method === 'GET') {
    try {
      const fileData = readFileSync(dbPathNewsletter, 'utf8');
      const data = JSON.parse(fileData);

      return res.status(200).json({
        error: false,
        status: '200',
        message: 'Successfully reading current newsletter subscriptions',
        payload: { data },
      });
    } catch (e: any) {
      return res
        .status(500)
        .json({ error: true, status: '500', message: e?.message ?? 'internal error', payload: { error: e } });
    }
  }
  return res.status(404).send({ error: true, status: '404', message: 'No such method in api' });
}
