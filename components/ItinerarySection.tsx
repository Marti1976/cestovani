import React from 'react';
import { ItineraryDay } from './types';
import PlaceCard from './PlaceCard';
import { RecommendationCard } from './RecommendationCard';
import { TravelInfoCard } from './TravelInfoCard';
import { IconFlagCheckered, IconChevronDown } from './Icons';

interface ItinerarySectionProps {
  data: ItineraryDay;
  visitedPlaces: Set<string>;
  onToggleVisited: (placeTitle: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ data, visitedPlaces, onToggleVisited, isCollapsed, onToggleCollapse }) => {
  
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg mb-10">
      <div className="p-6 md:p-8 pt-0 pb-0">
        <button
          onClick={onToggleCollapse}
          aria-expanded={!isCollapsed}
          aria-controls={`section-content-${data.sectionTitle.replace(/\s+/g, '-')}`}
          className="w-full flex justify-between items-center gap-4 pt-6 md:pt-8 pb-3 border-b-4 border-blue-500 text-left"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400">
            {data.sectionTitle}
          </h2>
          <span className={`transform transition-transform duration-300 ${!isCollapsed ? 'rotate-180' : ''}`}>
            <IconChevronDown className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </span>
        </button>
      </div>
      
      <div 
        id={`section-content-${data.sectionTitle.replace(/\s+/g, '-')}`}
        className={`grid transition-all duration-500 ease-in-out ${isCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="p-6 md:p-8 pt-6">
            {data.travelInfo && <TravelInfoCard travelInfo={data.travelInfo} />}
            {data.recommendation && <RecommendationCard recommendation={data.recommendation} />}

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
