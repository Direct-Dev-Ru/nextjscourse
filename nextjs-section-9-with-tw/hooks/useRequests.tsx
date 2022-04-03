// https://www.ibrahima-ndaw.com/blog/data-fetching-in-nextjs-using-useswr/
import { useEffect, useState } from 'react';
import { EventType, FilterFn } from '../types/types';
import { appConfig } from '../config/config';
import useSWR from 'swr';

const { URL: baseURL, fetcher, defaultPath } = appConfig;

export const useGetEvents = (path: string, filterFunction: FilterFn) => {
  if (!path) {
    path = defaultPath;
  }
  if (!filterFunction) {
    filterFunction = (e: EventType) => true;
  }

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const url = baseURL + path;

  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      const aEvents: EventType[] = [];
      for (const key in data) {
        const element = data[key];
        aEvents.push({ id: key, ...element });
      }
      setLoading(false);
      setEvents(aEvents.filter(filterFunction));
    }
  }, [data]);

  return { events, loading, error };
};
