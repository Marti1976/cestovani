import React, { useState, useCallback, useEffect } from 'react';
import { tripData } from './data';
import { Place, UsefulLink } from './components/types';
import ItinerarySection from './components/ItinerarySection';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import LoginOverlay from './components/LoginOverlay';
import UsefulLinks from './components/UsefulLinks';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  
  const APP_VERSION = tripData.version;

  const [visitedPlaces, setVisitedPlaces] = useState<Set<string>>(() => {
    try {
      const item = window.localStorage.getItem('visitedPlaces');
      return item ? new Set(JSON.parse(item)) : new Set();
    } catch (error) {
      console.error("Could not parse visited places from localStorage", error);
      return new Set();
    }
  });

  const [usefulLinks, setUsefulLinks] = useState<UsefulLink[]>(() => {
    try {
      const item = window.localStorage.getItem('usefulLinks');
      // If links are in localStorage, use them; otherwise, initialize from the main data file.
      return item ? JSON.parse(item) : tripData.usefulLinks;
    } catch (error)
    {
      console.error("Could not parse useful links from localStorage", error);
      return tripData.usefulLinks;
    }
  });
  
  useEffect(() => {
    try {
        const storedVersion = window.localStorage.getItem('tripVersion');
        if (storedVersion !== APP_VERSION) {
            console.log(`Version mismatch or first load. Stored: ${storedVersion}, New: ${APP_VERSION}. Clearing old data.`);
            
            // Clear old data
            window.localStorage.removeItem('visitedPlaces');
            window.localStorage.removeItem('usefulLinks');
            
            // Initialize state with fresh default data from tripData
            setVisitedPlaces(new Set());
            setUsefulLinks(tripData.usefulLinks);
            
            // Store the new version to prevent this from running again until the data changes
            window.localStorage.setItem('tripVersion', APP_VERSION);
        }
    } catch (error) {
        console.error("Error during app version check in localStorage", error);
    }
  }, [APP_VERSION]);

  useEffect(() => {
    try {
      // Avoid saving an empty set on the initial render if data was just cleared
      if (visitedPlaces.size > 0 || window.localStorage.getItem('visitedPlaces') !== null) {
          window.localStorage.setItem('visitedPlaces', JSON.stringify(Array.from(visitedPlaces)));
      }
    } catch (error) {
      console.error("Could not save visited places to localStorage", error);
    }
  }, [visitedPlaces]);

  useEffect(() => {
    try {
      window.localStorage.setItem('usefulLinks', JSON.stringify(usefulLinks));
    } catch (error) {
      console.error("Could not save useful links to localStorage", error);
    }
  }, [usefulLinks]);


  const handleLoginSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  
  const toggleVisited = (placeTitle: string) => {
    setVisitedPlaces(prev => {
      const newSet = new Set(prev);
      if (newSet.has(placeTitle)) {
        newSet.delete(placeTitle);
      } else {
        newSet.add(placeTitle);
      }
      return newSet;
    });
  };

  if (!isAuthenticated) {
    return <LoginOverlay onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header title={tripData.title} dates={tripData.dates} />
      <main className="container mx-auto px-4 py-8">
        <UsefulLinks links={usefulLinks} onLinksChange={setUsefulLinks} />
        {tripData.itinerary.map((day, index) => (
          <ItinerarySection 
            key={index} 
            data={day} 
            visitedPlaces={visitedPlaces}
            onToggleVisited={toggleVisited}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default App;