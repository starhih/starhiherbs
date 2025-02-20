import { Event, EventCategory, EventStatus } from '@/types/events';

export const events: Event[] = [
  {
    id: "vitafoods-asia-2024",
    title: "Vitafoods Asia 2024",
    slug: "vitafoods-asia-2024",
    description: "Join us at Vitafoods Asia 2024, the leading nutraceutical event in Asia. Discover our latest innovations in herbal extracts and meet our expert team.",
    shortDescription: "Asia's leading nutraceutical event showcasing latest innovations",
    category: "Trade Show",
    status: "Upcoming",
    startDate: "2024-09-25T09:00:00Z",
    endDate: "2024-09-27T18:00:00Z",
    location: {
      venue: "Singapore EXPO",
      address: "1 Expo Drive",
      city: "Singapore",
      country: "Singapore",
      coordinates: {
        lat: 1.335,
        lng: 103.959
      }
    },
    coverImage: "/events/vitafoods-asia-2024.jpg",
    galleryImages: [
      "/events/vitafoods-1.jpg",
      "/events/vitafoods-2.jpg",
      "/events/vitafoods-3.jpg"
    ],
    speakers: [
      {
        id: "john-smith",
        name: "Dr. John Smith",
        title: "Chief Scientific Officer",
        company: "Star Hi Herbs",
        bio: "Dr. Smith has over 20 years of experience in herbal extract research and development.",
        image: "/speakers/john-smith.jpg"
      }
    ],
    schedule: [
      {
        id: "day1-opening",
        startTime: "2024-09-25T09:00:00Z",
        endTime: "2024-09-25T10:00:00Z",
        title: "Opening Ceremony",
        description: "Official opening of Vitafoods Asia 2024"
      },
      {
        id: "presentation-1",
        startTime: "2024-09-25T11:00:00Z",
        endTime: "2024-09-25T12:00:00Z",
        title: "Innovation in Herbal Extracts",
        description: "Presentation on latest developments in extraction technology",
        speaker: {
          id: "john-smith",
          name: "Dr. John Smith",
          title: "Chief Scientific Officer",
          company: "Star Hi Herbs",
          bio: "Dr. Smith has over 20 years of experience in herbal extract research and development.",
          image: "/speakers/john-smith.jpg"
        }
      }
    ],
    registrationType: {
      id: "standard",
      name: "Event Registration",
      description: "Register to visit our booth and attend our presentations at Vitafoods Asia 2024",
      maxAttendees: 300,
      availableSpots: 150
    },
    featured: true,
    registrationDeadline: "2024-09-20T23:59:59Z",
    maxAttendees: 300,
    currentAttendees: 150,
    tags: ["Nutraceuticals", "Herbal Extracts", "Innovation", "Asia Pacific"],
    organizer: {
      name: "Star Hi Herbs",
      logo: "/logo.png",
      description: "Leading manufacturer of premium botanical ingredients"
    },
    meta: {
      seoTitle: "Vitafoods Asia 2024 | Star Hi Herbs",
      seoDescription: "Join Star Hi Herbs at Vitafoods Asia 2024, the leading nutraceutical event in Asia. Discover our latest innovations in herbal extracts.",
      keywords: ["Vitafoods", "Nutraceuticals", "Herbal Extracts", "Singapore", "Trade Show"]
    }
  }
];

export const getUpcomingEvents = (): Event[] => {
  return events.filter(event => event.status === "Upcoming");
};

export const getPastEvents = (): Event[] => {
  return events.filter(event => event.status === "Past");
};

export const getEventBySlug = (slug: string): Event | undefined => {
  return events.find(event => event.slug === slug);
};

export const getFeaturedEvents = (): Event[] => {
  return events.filter(event => event.featured);
};

export const getEventsByCategory = (category: EventCategory): Event[] => {
  return events.filter(event => event.category === category);
}; 