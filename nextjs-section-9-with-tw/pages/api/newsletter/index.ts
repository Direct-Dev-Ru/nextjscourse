import fs, { readFileSync } from 'fs';
// import path from 'path';
import { MongoClient } from 'mongodb';
import { apiConf } from '@/config/apiconfig';
import { logga } from '@/helper/loging/logga';

import type { NextApiRequest, NextApiResponse } from 'next';
import { dbPathBuild, readDbFileData } from '../../../helper/api-utils';
import { validator } from '../../../helper/validator';
const dbPathNewsletter = dbPathBuild('newsletter-data.json');

// Connection URI
const { mongoDbURI } = apiConf;
// const uri = 'mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    const userEmail: string | undefined = req?.body?.email ?? undefined;

    if (!validator('email', userEmail)) {
      return res
        .status(422)
        .json({ error: true, status: '422', message: 'validation error', payload: { email: userEmail } });
    }
    // Create a new MongoClient
    const dbClient = new MongoClient(mongoDbURI);
    try {
      const { data } = readDbFileData(dbPathNewsletter);

      // check for duplication
      const findItem = data.find((dataItem: any) => dataItem?.email === userEmail);

      if (findItem) {
        return res
          .status(422)
          .json({ error: true, status: '422', message: 'duplicate subscription', payload: { email: userEmail } });
      }

      const newSubscription = {
        id: new Date().toISOString(),
        email: userEmail,
      };
      data.push(newSubscription);
      fs.writeFileSync(dbPathNewsletter, JSON.stringify(data));

      // Connect the client to the server
      await dbClient.connect();
      // Establish and verify connection
      await dbClient.db().command({ ping: 1 });
      logga('Connected successfully to mongodb');

      await dbClient.db().collection('eventapp-emails-subscriptions').insertOne(newSubscription);

      return res.status(201).json({
        error: false,
        status: '201',
        message: 'Successfully added newsletter subscribtion',
        payload: { newSubscription },
      });
    } catch (e: any) {
      return res
        .status(500)
        .json({ error: true, status: '500', message: e?.message ?? 'internal error', payload: { error: e } });
    } finally {
      // Ensures that the client will close when you finish/error
      await dbClient.close();
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
