'use client'

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Define the type for the LogoContextValue
type LogoContextValue = {
  logoUrl: string;
  updateLogo: (newLogoUrl: string) => void;
};

// Create the logo context with the correct type
export const LogoContext = createContext<LogoContextValue>({
  logoUrl: '',
  updateLogo: () => {},
});

export default function LogoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [logoUrl, setLogoUrl] = useState<string>('');

  // Memoize the updateLogo function to avoid unnecessary re-renders
  const updateLogo = useCallback((newLogoUrl: string) => {
    setLogoUrl(newLogoUrl);
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({ logoUrl, updateLogo }), [logoUrl, updateLogo]);

  return (
    <LogoContext.Provider value={value}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogo() {
  const context = useContext(LogoContext);

  if (!context) {
    throw new Error(
      'useLogo must be used within a LogoProvider'
    );
  }

  return context;
}
