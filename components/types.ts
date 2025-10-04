export interface Place {
  id: number;
  title: string;
  rating?: string;
  tags: string[];
  description:string;
  mapLink?: string;
  webLink?: string;
}

export interface Accommodation {
  name: string;
  address: string;
  mapLink: string;
  bookingLink?: string;
}

export interface Recommendation {
  title: string;
  text: string;
  mapLink?: string;
}

export interface TravelInfo {
  title: string;
  description: string;
  distance?: string;
  duration?: string;
}

export interface UsefulLink {
  id: number;
  title: string;
  url: string;
}

export interface ItineraryDay {
  sectionTitle: string;
  travelInfo?: TravelInfo;
  accommodation?: Accommodation;
  recommendation?: Recommendation;
  places: Place[];
  isFinalDay?: boolean;
}

export interface TripData {
  versionIdentifier: string;
  title: string;
  dates: string;
  itinerary: ItineraryDay[];
  usefulLinks: UsefulLink[];
}
