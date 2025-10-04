import React, { useState } from 'react';
import { ItineraryDay } from './types';
import PlaceCard from './PlaceCard';
import { RecommendationCard } from './RecommendationCard';
import { AccommodationCard } from './AccommodationCard';
import { TravelInfoCard } from './TravelInfoCard';
import { IconChevronDown } from './Icons';

interface ItinerarySectionProps {
  data: ItineraryDay;
  visitedPlaces: Set<string>;
  onToggleVisited: (placeTitle: string) => void;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ data, visitedPlaces, onToggleVisited }) => {
  const [isOpen, setIsOpen] = useState(true);
  const sectionId = `section-content-${data.sectionTitle.replace(/\s+/g, '-')}`;

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg mb-10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center gap-4 p-6 md:p-8 text-left"
        aria-expanded={isOpen}
        aria-controls={sectionId}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400">
          {data.sectionTitle}
        </h2>
        <IconChevronDown className={`transform transition-transform duration-300 text-blue-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        id={sectionId}
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
            <div className="mb-6 border-b-4 border-blue-500"></div>
            
            {data.accommodation && <AccommodationCard accommodation={data.accommodation} />}
            {data.travelInfo && <TravelInfoCard travelInfo={data.travelInfo} />}
            {data.recommendation && <RecommendationCard recommendation={data.recommendation} />}

            {data.places.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                  {data.places.map((place) => (
                    <PlaceCard 
                      key={place.id} 
                      place={place} 
                      isVisited={visitedPlaces.has(place.title)}
                      onToggleVisited={() => onToggleVisited(place.title)}
                    />
                  ))}
                </div>
                <div className="text-center mt-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Celkem {data.places.length} návrhů
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;