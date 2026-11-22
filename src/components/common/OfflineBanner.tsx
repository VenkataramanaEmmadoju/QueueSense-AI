import React from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineBanner: React.FC = () => {
  const { isOnline } = useApp();

  if (isOnline) return null;

  return (
    <div className="bg-amber-500 text-navy-950 px-3 py-2 text-xs font-medium flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <WifiOff className="w-4 h-4 text-navy-950 shrink-0 animate-pulse" />
        <span>
          <strong>Offline Mode Active:</strong> Static views cached safely. Live bed reservation & real-time queue tracking are temporarily paused.
        </span>
      </div>
      <span className="text-[10px] bg-amber-600/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
        Safe Cache
      </span>
    </div>
  );
};
