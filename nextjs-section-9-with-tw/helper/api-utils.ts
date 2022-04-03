import apiConfig, { appConfig } from '../config/config';
import { EventType, FilterFn } from '../types/types';
import fs, { readFileSync } from 'fs';
import path from 'path';

const { URL: baseURL, defaultPath, defaultFilterEventsFunction } = appConfig;

export async function getEvents(filterFunction: FilterFn | undefined, signal: AbortSignal | undefined) {
  const res = await fetch(baseURL + defaultPath, { signal });
  const data = await res.json();

  if (!filterFunction) {
    filterFunction = defaultFilterEventsFunction;
  }

  const aEvents: EventType[] = [];
  for (const key in data) {
    const element = data[key];
    aEvents.push({ id: key, ...element });
  }
  return aEvents.filter(filterFunction);
}

export async function getEventById(id: string, signal: AbortSignal | undefined) {
  const res = await fetch(`${baseURL}eventbyid?eventId=${id}`, { signal });
  const data = await res.json();

  return data?.payload?.event ?? undefined;
}

export function dbPathBuild(fileName: string | undefined) {
  if (!fileName) {
    return path.join(process.cwd(), 'db', 'default-data.json');
  }
  return path.join(process.cwd(), 'db', fileName);
}

export const readDbFileData = (dbPath: any) => {
  const fileData = readFileSync(dbPath, 'utf8');
  const data = JSON.parse(fileData);
  return data;
};
