'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import WebFont from 'webfontloader';
import { fonts as PopularGoogleFonts } from '@/utils/fonts';

// Define the type for the ThemeContextValue
type ThemeContextValue = {
  theme: { color: string };
  updateTheme: (newColor: string) => void;
};

// Create the theme context with the correct type
export const ThemeContext = createContext<ThemeContextValue>({
  theme: { color: 'purple' },
  updateTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState({ color: '#ffffff' });

  // Memoize the updateTheme function to avoid unnecessary re-renders
  const updateTheme = useCallback((newColor: string) => {
    setTheme({ color: newColor });
  }, [theme]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: PopularGoogleFonts,
      },
    });
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({ theme, updateTheme }), [theme, updateTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme context should be used within a ThemeContextProvider'
    );
  }

  return context;
}
