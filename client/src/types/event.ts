export type EventType = 'world_tour' | 'comeback' | 'mv_release' | 'fanmeet' | 'other';

export interface FanEvent {
  id: string;
  title: string;
  type: EventType;
  era: string;
  tourName: string;
  venue: string;
  city: string;
  country: string;
  startsAt: string;
  endsAt: string | null;
  notes: string;
  featured: boolean;
  official: boolean;
}

export interface EventMeta {
  eventTypes: EventType[];
  tourNames: string[];
}

export type CreateEventInput = Omit<FanEvent, 'id'>;

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  totalMs: number;
}
