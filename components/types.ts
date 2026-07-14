export interface Place {
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
  places?: Place[];
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

export interface DocumentLink {
  id: number;
  title: string;
  url: string;
}

export interface TripData {
  versionIdentifier: string;
  title: string;
  dates: string;
  googleMyMapsLink?: string;
  itinerary: ItineraryDay[];
  usefulLinks: UsefulLink[];
  documents: DocumentLink[];
}