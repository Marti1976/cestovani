import React from 'react';
import { Map } from 'lucide-react';

interface HeaderProps {
    title: string;
    dates: string;
    versionIdentifier: string;
    googleMyMapsLink?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, dates, versionIdentifier, googleMyMapsLink }) => {
    return (
        <header className="relative bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-900 dark:to-slate-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-5">
                    <span>{title}</span>
                    {googleMyMapsLink && (
                        <a 
                            href={googleMyMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-1.5 bg-white/10 hover:bg-white/20 transition-all rounded-full border border-white/20 text-blue-100 hover:text-white"
                            title="Otevřít Moje Mapy v Google Mapách"
                            aria-label="Otevřít Moje Mapy v Google Mapách"
                        >
                            <Map className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                    )}
                </h1>
                <p className="mt-2 text-blue-200 dark:text-slate-300 text-sm md:text-base">
                    {dates}
                </p>
            </div>
            <div className="absolute top-2 right-4 text-xs text-blue-200/50 dark:text-slate-400/50 font-mono">
                {versionIdentifier}
            </div>
        </header>
    );
};