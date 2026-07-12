import React from 'react';
import { ItineraryDay } from './types';

interface DaySelectorProps {
  itinerary: ItineraryDay[];
  collapsedDays: Set<number>;
  onDaySelect: (index: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ itinerary, collapsedDays, onDaySelect }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-8 shadow-md">
      <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
        Rychlá navigace po dnech
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {itinerary.map((day, index) => {
          const parts = day.sectionTitle.split(':');
          const dayLabel = parts[0]?.trim() || `Den ${index + 1}`;
          const dayDesc = parts.slice(1).join(':')?.trim() || '';
          const isCollapsed = collapsedDays.has(index);

          return (
            <button
              key={index}
              onClick={() => onDaySelect(index)}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isCollapsed
                  ? 'opacity-40 grayscale saturate-50 bg-slate-50 dark:bg-slate-800/10 border-slate-200 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 hover:opacity-70 hover:scale-[1.01]'
                  : 'border-blue-100 dark:border-slate-700 bg-blue-50/30 dark:bg-slate-800/40 hover:bg-blue-100/60 dark:hover:bg-slate-700/80 hover:border-blue-300 dark:hover:border-slate-600 hover:scale-[1.02] active:scale-[0.98]'
              }`}
              aria-label={`Přejít na ${dayLabel}: ${dayDesc}${isCollapsed ? ' (sbaleno)' : ''}`}
            >
              <span className={`font-bold text-sm whitespace-nowrap mb-0.5 ${
                isCollapsed
                  ? 'text-slate-400 dark:text-slate-500 line-through'
                  : 'text-blue-700 dark:text-blue-400'
              }`}>
                {dayLabel} {isCollapsed && <span className="text-[10px] font-normal italic">(skryto)</span>}
              </span>
              <span className={`text-xs font-medium truncate w-full ${
                isCollapsed
                  ? 'text-slate-400/80 dark:text-slate-500/80 line-through'
                  : 'text-slate-600 dark:text-slate-300'
              }`}>
                {dayDesc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
