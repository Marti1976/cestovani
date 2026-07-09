
import React from 'react';
import { Accommodation } from './types';
import { IconBed, IconMapPin, IconWaze, IconBooking, IconCalendar, IconCheck } from './Icons';

interface AccommodationCardProps {
  accommodation: Accommodation;
  isVisited?: boolean;
  onToggleVisited?: () => void;
}

export const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation, isVisited, onToggleVisited }) => {
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

  const handleAddToCalendar = () => {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const title = encodeURIComponent(`Ubytování: ${accommodation.name}`);
    const details = encodeURIComponent(`Adresa: ${accommodation.address}\n\nOdkaz: ${accommodation.bookingLink || ''}`);
    let location = encodeURIComponent(accommodation.address);

    if (accommodation.mapLink) {
      if (accommodation.mapLink.startsWith('https://www.google.com/maps/search/')) {
        try {
          const url = new URL(accommodation.mapLink);
          const query = url.searchParams.get('query');
          if (query) {
            location = encodeURIComponent(query);
          }
        } catch (e) {
          console.error("Could not parse Google Maps URL, falling back to address.", e);
        }
      }
    }

    const calendarUrl = `${baseUrl}&text=${title}&details=${details}&location=${location}`;
    window.open(calendarUrl, '_blank');
  };
  
  if (isVisited) {
    return (
      <div className="bg-yellow-50/40 dark:bg-yellow-950/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-lg p-3 mb-6 flex items-center justify-between shadow-sm opacity-60 hover:opacity-100 transition-all duration-300">
        <div className="flex items-center gap-2 truncate pr-2">
          <IconBed />
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 line-through truncate">
            Ubytování: {accommodation.name}
          </span>
        </div>
        {onToggleVisited && (
          <button 
            onClick={onToggleVisited} 
            className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-xs shrink-0 cursor-pointer"
            aria-label="Označit jako neubytované"
          >
            <div className="w-5 h-5 border-2 rounded bg-green-500 border-green-500 flex items-center justify-center">
              <IconCheck />
            </div>
            <span>Ubytováno</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-lg p-5 mb-6 shadow-sm transition-all duration-300">
      <h3 className="flex items-center gap-3 text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
        <IconBed />
        Ubytování
      </h3>
      <p className="font-bold text-slate-800 dark:text-slate-100">{accommodation.name}</p>
      <p className="text-slate-600 dark:text-slate-300">{accommodation.address}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        <a href={accommodation.mapLink} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[90px] inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-colors">
          <IconMapPin />
          Mapa
        </a>
        {wazeLink && (
           <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[90px] inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-colors">
            <IconWaze />
            Waze
          </a>
        )}
        {accommodation.bookingLink && (
           <a href={accommodation.bookingLink} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[90px] inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-colors">
            <IconBooking />
            Booking
          </a>
        )}
      </div>
      <div className="border-t border-slate-200 dark:border-slate-700 mt-4 pt-3 flex justify-between items-center">
        <button onClick={handleAddToCalendar} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
           <IconCalendar />
           Přidat do kalendáře
        </button>
        {onToggleVisited && (
          <button onClick={onToggleVisited} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm font-medium" aria-label="Označit jako ubytované">
            <div className={`w-5 h-5 border-2 rounded ${isVisited ? 'bg-green-500 border-green-500' : 'border-slate-400'} flex items-center justify-center`}>
              {isVisited && <IconCheck />}
            </div>
            Ubytováno
          </button>
        )}
      </div>
    </div>
  );
};