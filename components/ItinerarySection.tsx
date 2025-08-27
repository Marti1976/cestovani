import React from 'react';
import { ItineraryDay, Place } from './types';
import PlaceCard from './PlaceCard';
import { RecommendationCard } from './RecommendationCard';
import { TravelInfoCard } from './TravelInfoCard';

interface ItinerarySectionProps {
  data: ItineraryDay;
  visitedPlaces: Set<string>;
  onToggleVisited: (placeTitle: string) => void;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ data, visitedPlaces, onToggleVisited }) => {
  
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mb-10">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-3 border-b-4 border-blue-500">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400">
          {data.sectionTitle}
        </h2>
      </div>

      {data.travelInfo && <TravelInfoCard travelInfo={data.travelInfo} />}
      {data.recommendation && <RecommendationCard recommendation={data.recommendation} />}

      {data.isFinalDay && (
        <div className="text-center py-8">
            <i className="fas fa-flag-checkered text-5xl text-blue-500"></i>
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
