import React from 'react';
import { ItineraryDay } from './types';
import PlaceCard from './PlaceCard';
import { RecommendationCard } from './RecommendationCard';
import { TravelInfoCard } from './TravelInfoCard';
import { AccommodationCard } from './AccommodationCard';
import { IconFlagCheckered, IconEye, IconEyeOff } from './Icons';

interface ItinerarySectionProps {
  id?: string;
  data: ItineraryDay;
  visitedPlaces: Set<string>;
  onToggleVisited: (placeTitle: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ 
  id, 
  data, 
  visitedPlaces, 
  onToggleVisited,
  isCollapsed,
  onToggleCollapse
}) => {
  
  if (isCollapsed) {
    return (
      <section id={id} className="bg-slate-100/60 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 mb-6 shadow-sm flex items-center justify-between transition-all duration-300">
        <h2 className="text-base md:text-lg font-bold text-slate-500 dark:text-slate-400 truncate pr-4">
          {data.sectionTitle}
        </h2>
        <button
          onClick={onToggleCollapse}
          className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200/40 dark:border-blue-800/30 shrink-0 cursor-pointer transition-colors"
          aria-label="Rozbalit den"
        >
          <IconEye />
          <span>Rozbalit den</span>
        </button>
      </section>
    );
  }

  return (
    <section id={id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mb-10 scroll-mt-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-3 border-b-4 border-blue-500">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 pr-2">
          {data.sectionTitle}
        </h2>
        <button
          onClick={onToggleCollapse}
          className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 font-semibold text-xs px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 dark:bg-slate-700/30 dark:hover:bg-blue-950/20 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900/30 shrink-0 cursor-pointer transition-all duration-200"
          aria-label="Skrýt den"
        >
          <IconEyeOff />
          <span>Skrýt den</span>
        </button>
      </div>

      {data.travelInfo && <TravelInfoCard travelInfo={data.travelInfo} />}
      {data.accommodation && (
        <AccommodationCard 
          accommodation={data.accommodation} 
          isVisited={visitedPlaces.has(data.accommodation.name)}
          onToggleVisited={() => onToggleVisited(data.accommodation.name)}
        />
      )}
      {data.recommendation && (
        <RecommendationCard 
          recommendation={data.recommendation} 
          visitedPlaces={visitedPlaces}
          onToggleVisited={onToggleVisited}
        />
      )}

      {data.isFinalDay && (
        <div className="text-center py-8 text-blue-500 dark:text-blue-400">
            <IconFlagCheckered />
        </div>
      )}

      {data.places.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {data.places.map((place, index) => (
            <PlaceCard 
              key={index} 
              place={place} 
              isVisited={visitedPlaces.has(place.title)}
              onToggleVisited={() => onToggleVisited(place.title)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ItinerarySection;