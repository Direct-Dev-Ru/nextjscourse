export type EventType = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type FilterFn = (e: EventType) => boolean;
