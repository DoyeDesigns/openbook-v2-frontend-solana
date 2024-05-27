'use client'

import React, { useState } from 'react';
import { fonts as PopularGoogleFonts } from '@/utils/fonts';

const FontPicker = () => {
  const [selectedFont, setSelectedFont] = useState<string>(PopularGoogleFonts[0]);

  return (
    <div>
      <h1 style={{fontFamily: 'Roboto'}}>Font Picker</h1>
      <h1 style={{fontFamily: 'Noto Sans JP'}}>Font Picker</h1>
      <h1 style={{fontFamily: 'Montserrat'}}>Font Picker</h1>
      <select
        value={selectedFont}
        onChange={e => setSelectedFont(e.target.value)}
        style={{ fontFamily: selectedFont, fontSize: '16px' }}
      >
        {PopularGoogleFonts.map(font => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
      <p style={{ fontFamily: selectedFont, fontSize: '24px' }}>
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>
  );
};

export default FontPicker;



// useEffect(() => {
  //   const fetchFonts = async () => {
  //     const apiKey = process.env.GOOGLE_FONTS_API_KEY || 'AIzaSyBWqd5-MkrppGF6oGn6aeoFFnqdnrL6UxQ'; // Ensure your API key is stored in .env.local
  //     console.log(apiKey)
  //     try {
  //       const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&family=Roboto`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       const fontFamilies = data.items.map((font: { family: string }) => font.family);
  //       console.log(fontFamilies)
  //       setFonts(fontFamilies);
  //       setSelectedFont(fontFamilies[0]); // Set initial font to the first one in the list
  //     } catch (error) {
  //       console.error('Error fetching fonts:', error);
  //     }
  //   };

  //   fetchFonts();
  // }, []);