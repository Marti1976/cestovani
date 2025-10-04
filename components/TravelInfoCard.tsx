
import React from 'react';
import { TravelInfo } from './types';
import { IconCar, IconRoad, IconClock } from './Icons';

interface TravelInfoCardProps {
  travelInfo: TravelInfo;
}

export const TravelInfoCard: React.FC<TravelInfoCardProps> = ({ travelInfo }) => (
  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 rounded-r-lg p-5 mb-6 shadow-sm">
    <div className="flex items-center gap-3 text-lg font-semibold text-blue-800 dark:text-blue-300">
      <IconCar />
      <p>{travelInfo.title}</p>
    </div>
    <p className="text-slate-600 dark:text-slate-300 mt-1 pl-9 whitespace-pre-line">{travelInfo.description}</p>
    {(travelInfo.distance || travelInfo.duration) && (
      <div className="mt-3 pl-9 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
        {travelInfo.distance && (
          <span className="flex items-center gap-2">
            <IconRoad />
            {travelInfo.distance}
          </span>
        )}
        {travelInfo.duration && (
          <span className="flex items-center gap-2">
            <IconClock />
            {travelInfo.duration}
          </span>
        )}
      </div>
    )}
  </div>
);