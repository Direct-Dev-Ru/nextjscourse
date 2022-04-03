import apiConfig, { appConfig } from '../config/config';
import { EventType, FilterFn } from '../types/types';
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

// export async function getEventByIdOld(id: string) {
//   const events = await getEvents(defaultFilterEventsFunction);

//   if (events && events.length > 0) {
//     return events[0];
//   }

//   return;
// }
