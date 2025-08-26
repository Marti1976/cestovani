
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
          Příjemnou cestu!
        </p>
        <p className="text-sm mt-2">
          Vytvořeno s využitím React a Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};