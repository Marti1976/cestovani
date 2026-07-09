
import React from 'react';
import { Recommendation } from './types';
import { IconLightbulb, IconMapPin } from './Icons';
import PlaceCard from './PlaceCard';

interface RecommendationCardProps {
  recommendation: Recommendation;
  visitedPlaces?: Set<string>;
  onToggleVisited?: (placeTitle: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, visitedPlaces, onToggleVisited }) => (
  <div className="bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-400 dark:border-sky-500 rounded-r-lg p-5 mb-6 shadow-sm">
    <h4 className="flex items-center gap-3 text-lg font-semibold text-sky-800 dark:text-sky-300 mb-2">
      <IconLightbulb />
      {recommendation.title}
    </h4>
    <p className="text-slate-600 dark:text-slate-300">
      <strong>{recommendation.text.split('.')[0]}.</strong>
      {recommendation.text.substring(recommendation.text.indexOf('.') + 1)}
    </p>
    {recommendation.mapLink && (
      <div className="mt-4">
        <a href={recommendation.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
          <IconMapPin />
          Mapa
        </a>
      </div>
    )}
    
    {recommendation.places && recommendation.places.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {recommendation.places.map((place, index) => (
          <PlaceCard 
            key={index} 
            place={place} 
            isVisited={visitedPlaces?.has(place.title)}
            onToggleVisited={onToggleVisited ? () => onToggleVisited(place.title) : undefined}
          />
        ))}
      </div>
    )}
  </div>
);