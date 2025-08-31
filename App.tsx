import React, { useState, useCallback, useEffect } from 'react';
import { tripData } from './data';
import { UsefulLink } from './components/types';
import ItinerarySection from './components/ItinerarySection';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import LoginOverlay from './components/LoginOverlay';
import UsefulLinks from './components/UsefulLinks';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  
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

  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(() => {
    try {
      const item = window.localStorage.getItem('collapsedSections');
      return item ? new Set(JSON.parse(item)) : new Set();
    } catch (error) {
      console.error("Could not parse collapsed sections from localStorage", error);
      return new Set();
    }
  });
  
  useEffect(() => {
    const storedVersion = window.localStorage.getItem('tripVersion');

    if (storedVersion && storedVersion !== APP_VERSION_IDENTIFIER) {
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
        window.localStorage.removeItem('collapsedSections');
        setVisitedPlaces(new Set());
        setUsefulLinks(tripData.usefulLinks);
        setCollapsedSections(new Set());
      } else {
        console.log("Same trip, minor version update. Merging useful links and preserving user data.");
        
        const storedLinksJSON = window.localStorage.getItem('usefulLinks');
        const newDefaultLinks = tripData.usefulLinks;

        if (storedLinksJSON) {
            try {
                const storedLinks: UsefulLink[] = JSON.parse(storedLinksJSON);
                const linksMap = new Map<string, UsefulLink>();
                
                storedLinks.forEach(link => linksMap.set(link.url, link));
                newDefaultLinks.forEach(link => {
                    if (!linksMap.has(link.url)) {
                        linksMap.set(link.url, link);
                    }
                });
                
                const mergedLinks = Array.from(linksMap.values());
                
                setUsefulLinks(mergedLinks);
                window.localStorage.setItem('usefulLinks', JSON.stringify(mergedLinks));

            } catch(e) {
                 console.error("Failed to parse or merge useful links, resetting to default.", e);
                 setUsefulLinks(newDefaultLinks);
                 window.localStorage.setItem('usefulLinks', JSON.stringify(newDefaultLinks));
            }
        } else {
            setUsefulLinks(newDefaultLinks);
            window.localStorage.setItem('usefulLinks', JSON.stringify(newDefaultLinks));
        }
      }
      
      window.localStorage.setItem('tripVersion', APP_VERSION_IDENTIFIER);

      console.log('Data updated, showing update prompt.');
      setShowUpdatePrompt(true);
    } else if (!storedVersion) {
      // Set initial version on first load without triggering a reload prompt
      window.localStorage.setItem('tripVersion', APP_VERSION_IDENTIFIER);
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

  useEffect(() => {
    try {
      window.localStorage.setItem('collapsedSections', JSON.stringify(Array.from(collapsedSections)));
    } catch (error) {
      console.error("Could not save collapsed sections to localStorage", error);
    }
  }, [collapsedSections]);
  
  useEffect(() => {
    const sectionsToCollapse = new Set<string>();
    tripData.itinerary.forEach(day => {
      if (day.places && day.places.length > 0) {
        const allVisited = day.places.every(place => visitedPlaces.has(place.title));
        if (allVisited) {
          sectionsToCollapse.add(day.sectionTitle);
        }
      }
    });

    if (sectionsToCollapse.size > 0) {
      setCollapsedSections(prev => {
        const newSet = new Set(prev);
        sectionsToCollapse.forEach(title => newSet.add(title));
        return newSet;
      });
    }
  }, [visitedPlaces]);


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

  const toggleSectionCollapse = (sectionTitle: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionTitle)) {
        newSet.delete(sectionTitle);
      } else {
        newSet.add(sectionTitle);
      }
      return newSet;
    });
  };

  const collapseAll = () => {
    const allSectionTitles = tripData.itinerary.map(day => day.sectionTitle);
    setCollapsedSections(new Set(allSectionTitles));
  };

  const expandAll = () => {
    setCollapsedSections(new Set());
  };


  if (!isAuthenticated) {
    return <LoginOverlay onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header title={tripData.title} dates={tripData.dates} versionIdentifier={APP_VERSION_IDENTIFIER} />
      <main className="container mx-auto px-4 py-8">
        <UsefulLinks links={usefulLinks} onLinksChange={setUsefulLinks} />
        <div className="flex justify-end gap-2 mb-4">
          <button onClick={collapseAll} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            Sbalit vše
          </button>
          <button onClick={expandAll} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            Rozbalit vše
          </button>
        </div>
        {tripData.itinerary.map((day, index) => (
          <ItinerarySection 
            key={index} 
            data={day} 
            visitedPlaces={visitedPlaces}
            onToggleVisited={toggleVisited}
            isCollapsed={collapsedSections.has(day.sectionTitle)}
            onToggleCollapse={() => toggleSectionCollapse(day.sectionTitle)}
          />
        ))}
      </main>
      <Footer />
      {showUpdatePrompt && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto bg-blue-600 dark:bg-blue-800 text-white py-3 px-6 rounded-full shadow-lg z-50 flex items-center gap-4">
            <p className="text-sm font-medium">Je dostupná nová verze plánu.</p>
            <button
                onClick={() => window.location.reload()}
                className="bg-white text-blue-600 font-bold py-1 px-4 rounded-full hover:bg-blue-100 transition-colors text-sm"
                aria-label="Aktualizovat aplikaci"
            >
                Aktualizovat
            </button>
        </div>
      )}
    </div>
  );
};

export default App;
