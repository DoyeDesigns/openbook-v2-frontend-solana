'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import WebFont from 'webfontloader';
import { fonts as PopularGoogleFonts } from '@/utils/fonts'; // Assume this is an array of popular Google font names

// Define the type for the FontContextValue
type FontContextValue = {
  font: string;
  updateFont: (newFont: string) => void;
};

// Create the font context with the correct type
export const FontContext = createContext<FontContextValue>({
  font: 'Roboto', // Default font
  updateFont: () => {},
});

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [font, setFont] = useState<string>('Roboto');

  // Function to update font and store it in local storage
  const updateFont = useCallback((newFont: string) => {
    setFont(newFont);
    localStorage.setItem('selectedFont', newFont);
    WebFont.load({
      google: {
        families: [newFont],
      },
    });
  }, []);

  // Load font from local storage on initial render
  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont');
    if (savedFont) {
      setFont(savedFont);
      WebFont.load({
        google: {
          families: [savedFont],
        },
      });
    } else {
      // Load the default font
      WebFont.load({
        google: {
          families: ['Roboto'],
        },
      });
    }
  }, []);

  // Load popular fonts initially
  useEffect(() => {
    WebFont.load({
      google: {
        families: PopularGoogleFonts,
      },
    });
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({ font, updateFont }), [font, updateFont]);

  return (
    <FontContext.Provider value={value}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = (): FontContextValue => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
