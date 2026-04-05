import React, { useState } from 'react';
import { IconCar } from './Icons';

interface LoginOverlayProps {
  onSuccess: () => void;
}

// SHA-256 hash of "123456"
const CORRECT_HASH = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const enteredHash = await sha256(password);

    if (enteredHash === CORRECT_HASH) {
      onSuccess();
    } else {
      setError('Nesprávné heslo. Zkuste to znovu.');
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="inline-block bg-blue-600 p-3 rounded-full text-white mb-4">
            <IconCar />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Cestovní Plánovač</h1>
          <p className="text-slate-500 dark:text-slate-400">Zadejte heslo pro přístup</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">Heslo</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Heslo"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Ověřuji...' : 'Vstoupit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginOverlay;