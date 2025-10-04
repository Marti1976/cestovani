
import React from 'react';
import { Accommodation } from './types';
import { IconBed, IconMapPin, IconWaze, IconBooking } from './Icons';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  const getWazeLink = (mapLink: string) => {
    if (!mapLink) return null;
    try {
      const url = new URL(mapLink);
      const query = url.searchParams.get('query');
      if (query) {
        const encodedQuery = encodeURIComponent(query);
        return `https://waze.com/ul?q=${encodedQuery}&navigate=yes`;
      }
    } catch (e) {
      console.error("Could not parse Google Maps URL for Waze link", e);
    }
    return null;
  };
  
  const wazeLink = getWazeLink(accommodation.mapLink);
  
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-lg p-5 mb-6 shadow-sm">
      <h3 className="flex items-center gap-3 text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
        <IconBed />
        Ubytování
      </h3>
      <p className="font-bold text-slate-800 dark:text-slate-100">{accommodation.name}</p>
      <p className="text-slate-600 dark:text-slate-300">{accommodation.address}</p>
      <div className="flex gap-3 mt-3">
        <a href={accommodation.mapLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
          <IconMapPin />
          Mapa
        </a>
        {wazeLink && (
           <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
            <IconWaze />
            Waze
          </a>
        )}
        {accommodation.bookingLink && (
           <a href={accommodation.bookingLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
            <IconBooking />
            Booking
          </a>
        )}
      </div>
    </div>
  );
};