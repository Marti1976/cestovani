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
        console.log("Same trip, minor version update. Merging useful links and preserving user data.");
        
        // Merge useful links
        const storedLinksJSON = window.localStorage.getItem('usefulLinks');
        const newDefaultLinks = tripData.usefulLinks;

        if (storedLinksJSON) {
            try {
                const storedLinks: UsefulLink[] = JSON.parse(storedLinksJSON);
                const linksMap = new Map<string, UsefulLink>();
                
                // Add stored links first to prioritize user's customizations and additions
                storedLinks.forEach(link => linksMap.set(link.url, link));

                // Add new default links only if their URL is not already present
                newDefaultLinks.forEach(link => {
                    if (!linksMap.has(link.url)) {
                        linksMap.set(link.url, link);
                    }
                });
                
                const mergedLinks = Array.from(linksMap.values());
                
                // Update state and localStorage before reload
                setUsefulLinks(mergedLinks);
                window.localStorage.setItem('usefulLinks', JSON.stringify(mergedLinks));

            } catch(e) {
                 console.error("Failed to parse or merge useful links, resetting to default.", e);
                 setUsefulLinks(newDefaultLinks);
                 window.localStorage.setItem('usefulLinks', JSON.stringify(newDefaultLinks));
            }
        } else {
            // No stored links, just use the new defaults
            setUsefulLinks(newDefaultLinks);
            window.localStorage.setItem('usefulLinks', JSON.stringify(newDefaultLinks));
        }
      }
      
      window.localStorage.setItem('tripVersion', APP_VERSION_IDENTIFIER);

      // With a "Network First" service worker, a simple reload is enough
      // to fetch the updated assets. The aggressive unregistering is no longer needed.
      console.log('Data updated, reloading page to apply changes.');
      window.location.reload();
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
