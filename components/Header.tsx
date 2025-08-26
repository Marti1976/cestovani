import React from 'react';

interface HeaderProps {
    title: string;
    dates: string;
}

export const Header: React.FC<HeaderProps> = ({ title, dates }) => {
    return (
        <header className="bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-900 dark:to-slate-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
                <p className="mt-2 text-blue-200 dark:text-slate-300 text-sm md:text-base">
                    {dates}
                </p>
            </div>
        </header>
    );
};
