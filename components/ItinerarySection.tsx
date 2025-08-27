import React from 'react';
import { ItineraryDay, Place } from './types';
import PlaceCard from './PlaceCard';
import { RecommendationCard } from './RecommendationCard';
import { TravelInfoCard } from './TravelInfoCard';
import { IconMap } from './Icons';

interface ItinerarySectionProps {
  data: ItineraryDay;
  visitedPlaces: Set<string>;
  onToggleVisited: (placeTitle: string) => void;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ data, visitedPlaces, onToggleVisited }) => {
  
  const CHUNK_SIZE = 10; // The number of places to show on the map at once.

  // Function to split the array of places into smaller chunks
  const getPlaceChunks = (places: Place[]): Place[][] => {
    const chunks: Place[][] = [];
    if (!places) return chunks;
    for (let i = 0; i < places.length; i += CHUNK_SIZE) {
      chunks.push(places.slice(i, i + CHUNK_SIZE));
    }
    return chunks;
  };

  const placeChunks = getPlaceChunks(data.places);

  const handleShowChunkOnMap = (placesInChunk: Place[]) => {
    if (placesInChunk.length === 0) return;

    // Use Mapy.cz which handles multiple query parameters gracefully.
    // This is more robust than a single long query for Google Maps.
    // We use the "turisticka" (tourist) map, which is ideal for travel.
    const baseUrl = 'https://mapy.cz/turisticka';
    
    // Use URLSearchParams for robust and safe query string construction.
    // This prevents malformed URLs (e.g., trailing '&' or incorrect encoding).
    const params = new URLSearchParams();
    placesInChunk.forEach(place => {
      params.append('q', place.title);
    });

    const mapUrl = `${baseUrl}?${params.toString()}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };


  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 mb-10">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-3 border-b-4 border-blue-500">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400">
          {data.sectionTitle}
        </h2>
        <div className="flex flex-wrap gap-2">
           {placeChunks.map((chunk, index) => (
            <button
              key={index}
              onClick={() => handleShowChunkOnMap(chunk)}
              className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              <IconMap />
              {`Zobrazit na mapě${placeChunks.length > 1 ? ` (část ${index + 1})` : ''}`}
            </button>
          ))}
        </div>
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
