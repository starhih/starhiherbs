export type EventCategory = 'Trade Show' | 'Conference' | 'Workshop' | 'Webinar';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Past';

export type EventLocation = {
  venue: string;
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export type EventSpeaker = {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
};

export type EventScheduleItem = {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  speaker?: EventSpeaker;
  location?: string;
};

export type RegistrationType = {
  id: string;
  name: string;
  description: string;
  maxAttendees: number;
  availableSpots: number;
};

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  status: EventStatus;
  startDate: string;
  endDate: string;
  location: EventLocation;
  coverImage: string;
  galleryImages?: string[];
  speakers: EventSpeaker[];
  schedule: EventScheduleItem[];
  registrationType: RegistrationType;
  featured: boolean;
  registrationDeadline: string;
  maxAttendees: number;
  currentAttendees: number;
  tags: string[];
  organizer: {
    name: string;
    logo: string;
    description: string;
  };
  meta: {
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
  };
} 