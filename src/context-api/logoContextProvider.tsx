'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

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

export const LogoProvider = ({ children }: { children: React.ReactNode }) => {
  const [logoUrl, setLogoUrl] = useState<string>('');

  // Function to update logo and store it in local storage
  const updateLogo = useCallback((newLogoUrl: string) => {
    setLogoUrl(newLogoUrl);
    localStorage.setItem('logoUrl', newLogoUrl);
  }, []);

  // Load logo from local storage on initial render
  useEffect(() => {
    const savedLogoUrl = localStorage.getItem('logoUrl');
    if (savedLogoUrl) {
      setLogoUrl(savedLogoUrl);
    }
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({ logoUrl, updateLogo }), [logoUrl, updateLogo]);

  return (
    <LogoContext.Provider value={value}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = (): LogoContextValue => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};
