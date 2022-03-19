import { EventType, FilterFn } from '../types/types';
import fs from 'fs/promises';
import path from 'path';

export async function getEvents() {
  const dbPath = path.resolve('db', 'events-data.json');
  //   console.log(dbPath);
  const jsonRaw = await fs.readFile(dbPath, 'utf-8');
  //   console.log(jsonRaw);
  return JSON.parse(jsonRaw);
}

export async function getEventById(eventId: string): Promise<EventType | undefined> {
  const events = await getEvents();
  if (events) {
    const event: EventType = events[eventId];
    return event;
  }

  return undefined;
}
// export function getFeaturedEvents(events: DummyData[]) {
//   if (!events || events.length === 0) {
//     events = DUMMY_EVENTS;
//     console.log('default dummy data');
//   }
//   return events.filter((event) => event.isFeatured);
// }

// export function getFilteredEvents(dateFilter: any) {
//   const { year, month } = dateFilter;

//   const filteredEvents = DUMMY_EVENTS.filter((event) => {
//     const eventDate = new Date(event.date);
//     return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
//   });

//   return filteredEvents;
// }

// export function getEventById(id: string) {
//   return DUMMY_EVENTS.find((event) => event.id === id);
// }
