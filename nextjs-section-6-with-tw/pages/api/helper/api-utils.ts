import apiConfig from '../config';
import { EventType, FilterFn } from '../types';
const { URL: baseURL, defaultPath, defaultFilterEventsFunction } = apiConfig;

export async function getEvents(filterFunction: FilterFn | undefined) {
  const res = await fetch(baseURL + defaultPath);
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

export async function getEventById(id: string) {
  const events = await getEvents(defaultFilterEventsFunction);

  if (events && events.length > 0) {
    return events[0];
  }

  return;
}
