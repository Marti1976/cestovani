
import React from 'react';
import { Place } from './types';
import { IconMapPin, IconLink, IconSparkles, IconCalendar, IconCheck, IconWaze } from './Icons';

interface PlaceCardProps {
  place: Place;
  isVisited: boolean;
  onToggleVisited: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, isVisited, onToggleVisited }) => {

  const handleAddToCalendar = () => {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const title = encodeURIComponent(place.title);
    const details = encodeURIComponent(place.description);
    
    let location = encodeURIComponent(place.title); // Default fallback

    if (place.mapLink) {
      // Handles current Google Maps search links
      if (place.mapLink.startsWith('https://www.google.com/maps/search/')) {
        try {
          const url = new URL(place.mapLink);
          const query = url.searchParams.get('query');
           if (query) {
            location = encodeURIComponent(query);
          }
        } catch (e) {
          console.error("Could not parse Google Maps URL, falling back to title.", e);
        }
      }
    }

    const calendarUrl = `${baseUrl}&text=${title}&details=${details}&location=${location}`;
    window.open(calendarUrl, '_blank');
  };

  const getWazeLink = () => {
    if (!place.mapLink) return null;
    try {
      // The mapLink is in the format: https://www.google.com/maps/search/?api=1&query=...
      const url = new URL(place.mapLink);
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

  const handleAiGuideClick = async () => {
    const aiGuideQuery = `Pověz mi zajímavosti o: ${place.title}`;
    
    // The Web Share API is the most reliable and user-friendly method for mobile devices.
    // It allows the user to choose their preferred application from the native share sheet.
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AI Průvodce: ${place.title}`,
          text: aiGuideQuery,
        });
        return; // Success, action is complete.
      } catch (error) {
        // If the user cancels the share dialog, browsers throw an AbortError.
        // In this case, we don't want to proceed to the fallback. We just stop.
        if (error instanceof DOMException && error.name === 'AbortError') {
          console.log('Sdílení bylo zrušeno uživatelem.');
          return;
        }
        // For any other unexpected errors, we log it and then proceed to the fallback.
        console.error('Chyba při sdílení, používám fallback:', error);
      }
    }
  
    // Fallback for desktops or if the Share API fails for unexpected reasons.
    const encodedQuery = encodeURIComponent(aiGuideQuery);
    const webUrl = `https://gemini.google.com/app?prompt=${encodedQuery}`;
    window.open(webUrl, '_blank', 'noopener,noreferrer');
  };
  
  const wazeLink = getWazeLink();
  
  const buttonCount = [place.mapLink, wazeLink, place.webLink].filter(Boolean).length;
  const buttonSizeClass = buttonCount === 3 
    ? 'text-xs py-2 px-3 gap-1.5' // Compact for 3 buttons
    : 'text-sm py-2 px-4 gap-2';  // Standard for 1 or 2


  return (
    <div className={`relative bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col justify-between shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${isVisited ? 'opacity-50 grayscale' : ''}`}>
      <div className="absolute top-4 right-4 text-sm font-mono text-slate-400 dark:text-slate-500 select-none">#{place.id}</div>
      <div>
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 pr-10">{place.title}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
             {place.rating && (
              <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                {place.rating}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {place.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
          {place.description}
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-3">
         <button
          onClick={handleAiGuideClick}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
        >
          <IconSparkles />
          AI Průvodce
        </button>
        <div className="flex gap-3">
            {place.mapLink && (
              <a href={place.mapLink} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 ${buttonSizeClass}`}>
                <IconMapPin />
                Mapa
              </a>
            )}
            {wazeLink && (
              <a href={wazeLink} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 ${buttonSizeClass}`}>
                <IconWaze />
                Waze
              </a>
            )}
            {place.webLink && (
              <a href={place.webLink} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 ${buttonSizeClass}`}>
                <IconLink />
                Web
              </a>
            )}
        </div>
        <div className="border-t border-slate-200 dark:border-slate-600 mt-3 pt-3 flex justify-between items-center">
          <button onClick={handleAddToCalendar} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
             <IconCalendar />
             Přidat do kalendáře
          </button>
          <button onClick={onToggleVisited} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm font-medium" aria-label="Označit jako navštívené">
            <div className={`w-5 h-5 border-2 rounded ${isVisited ? 'bg-green-500 border-green-500' : 'border-slate-400'} flex items-center justify-center`}>
              {isVisited && <IconCheck />}
            </div>
            Navštíveno
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;