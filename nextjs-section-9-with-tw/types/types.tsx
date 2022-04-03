export type EventType = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type FeedbackType = {
  id: string;
  eventId: string;
  email: string;
  text: string;
};

export type FilterFn = (e: EventType) => boolean;
