'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context-api/themeContextProvider';
import { useFont } from '@/context-api/fontContextProvider';



const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const {theme} = useTheme();
    const {font} = useFont();

  return (
    <div style={{backgroundColor: theme.color, fontFamily: font}}>
      {children}
    </div>
  );
};

export default ThemeWrapper;