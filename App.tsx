
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
  
  const APP_VERSION_IDENTIFIER = tripData.versionIdentifier;

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
      return item ? JSON.parse(item) : tripData.usefulLinks;
    } catch (error)
    {
      console.error("Could not parse useful links from localStorage", error);
      return tripData.usefulLinks;
    }
  });
  
  useEffect(() => {
    const storedVersion = window.localStorage.getItem('tripVersion');

    if (storedVersion !== APP_VERSION_IDENTIFIER) {
      console.log(`Version change detected. Stored: ${storedVersion}, New: ${APP_VERSION_IDENTIFIER}.`);

      const getTripId = (versionIdentifier: string | null) => {
        if (!versionIdentifier) return null;
        return versionIdentifier.split('-v')[0];
      };

      const newTripId = getTripId(APP_VERSION_IDENTIFIER);
      const oldTripId = getTripId(storedVersion);

      if (newTripId !== oldTripId) {
        console.log(`New trip detected ('${newTripId}' vs '${oldTripId}'). Clearing all user data.`);
        window.localStorage.removeItem('visitedPlaces');
        window.localStorage.removeItem('usefulLinks');
        setVisitedPlaces(new Set());
        setUsefulLinks(tripData.usefulLinks);
      } else {
        console.log("Same trip, minor version update. User data will be preserved.");
      }
      
      window.localStorage.setItem('tripVersion', APP_VERSION_IDENTIFIER);

      // Force a hard refresh to get the latest assets and bypass service worker cache
      const clearCacheAndReload = async () => {
        try {
          if ('serviceWorker' in navigator) {
            // Wait for the service worker to be ready to avoid race conditions,
            // but with a timeout to prevent hanging indefinitely.
            const readyWithTimeout = Promise.race([
              navigator.serviceWorker.ready,
              new Promise((_, reject) => setTimeout(() => reject(new Error('Service Worker ready timeout')), 2000))
            ]);

            await readyWithTimeout;
            
            const registrations = await navigator.serviceWorker.getRegistrations();
            if (registrations && registrations.length) {
              await Promise.all(registrations.map(r => r.unregister()));
              console.log('All service workers unregistered.');
            }

            const cacheKeys = await caches.keys();
            if (cacheKeys && cacheKeys.length) {
              await Promise.all(cacheKeys.map(key => caches.delete(key)));
              console.log('All caches cleared.');
            }
          }
        } catch (error) {
          console.error('Failed to clear service worker or cache:', error);
          // The process will continue to the finally block to reload.
        } finally {
          console.log('Reloading page due to version change.');
          window.location.reload();
        }
      };
      
      clearCacheAndReload();
    }
  }, [APP_VERSION_IDENTIFIER]);


  useEffect(() => {
    try {
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
      <Header title={tripData.title} dates={tripData.dates} versionIdentifier={APP_VERSION_IDENTIFIER} />
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
