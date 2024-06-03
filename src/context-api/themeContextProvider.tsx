'use client';

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
  theme: { color: '#272332' },
  updateTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<{ color: string }>({ color: '#272332' });

  // Function to update theme and store it in local storage
  const updateTheme = useCallback((newColor: string) => {
    setTheme({ color: newColor });
    localStorage.setItem('themeColor', newColor);
  }, []);

  // Load theme from local storage on initial render
  useEffect(() => {
    const savedThemeColor = localStorage.getItem('themeColor');
    if (savedThemeColor) {
      setTheme({ color: savedThemeColor });
    }
  }, []);

  // Load Google Fonts
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
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
