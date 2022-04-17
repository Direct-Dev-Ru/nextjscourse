import * as afs from 'fs/promises';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbPathBuild, readDbFileData } from '../../../helper/api-utils';
import { validator } from '../../../helper/validator';
import { cyrb53 } from '../../../helper/hash';
import { MongoClient } from 'mongodb';
import { apiConf } from '@/config/apiconfig';
import { logga } from '../../../helper/loging/logga';

const dbPathComment = dbPathBuild('comment-data.json');
// Connection URI
const { mongoDbURI } = apiConf;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // Create a new MongoClient
  const dbClient = new MongoClient(mongoDbURI);
  try {
    const eventId: string | string[] = req?.query?.eventId ?? undefined;
    const { data } = readDbFileData(dbPathComment);
    // Connect the client to the server
    await dbClient.connect();
    // Establish and verify connection
    await dbClient.db().command({ ping: 1 });
    logga('Connected successfully to mongodb');

    if (req.method === 'POST') {
      const { email, name, text } = req.body;

      //   validation ... better to use sanitaize
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
      //   if in text var there are tags - break ...
      const findTags = validator('custom', text, /(<([^>]+)>)/gi);
      if (findTags || !validator('empty', text)) {
        return res.status(422).json({
          error: true,
          status: '422',
          message: 'text validation error: some tags find or text is empty',
          payload: { findTags },
        });
      }
      //   end if validation

      const newComment = {
        id: '',
        when: new Date().toISOString(),
        eventId,
        email: email.trim(),
        name: name.trim(),
        text: text.trim(),
        hash: cyrb53(eventId + email.trim() + text.trim()),
      };

      if (data.find((comment: any) => comment.hash === newComment.hash)) {
        return res
          .status(422)
          .json({ error: true, status: '422', message: 'duplicate comment', payload: { newComment } });
      }
      //   write to MongoDb
      const db = dbClient.db();
      const dbCollection = db.collection('eventapp-event-comments');
      const result = await dbCollection.insertOne(newComment);
      newComment.id = result.insertedId.toString();

      //   TODO: remove file-based store
      // write to file
      data.push(newComment);
      await afs.writeFile(dbPathComment, JSON.stringify(data));

      return res.status(201).json({
        error: false,
        status: '201',
        message: 'Successfully added new comment',
        payload: { newComment },
      });
    }

    if (req.method === 'GET') {
      const eventComments = data.filter((comment: any) => comment.eventId === eventId);
      return res.status(200).json({
        error: false,
        status: '200',
        message: 'Successfully reading comments for eventId = ' + eventId,
        payload: { data: eventComments },
      });
    }
  } catch (e: any) {
    return res
      .status(500)
      .json({ error: true, status: '500', message: e?.message ?? 'internal error', payload: { error: e } });
  } finally {
    // Ensures that the client will close when you finish/error
    await dbClient.close();
  }

  if (req.method === '#DELETE') {
    // ...
  }

  return res.status(404).send({ error: true, status: '404', message: 'No such method in api' });
}
