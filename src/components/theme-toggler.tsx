import React, { useContext } from 'react';
import { ThemeContext } from './theme-provider';

const ThemeToggler = () => {
  const { theme, updateTheme } = useContext(ThemeContext);

  const handleColorChange = (e: { target: { value: string; }; }) => {
    updateTheme(e.target.value);
  };

  return (
    <div style={{backgroundColor: theme.color}}>
      <label htmlFor="color-picker">Choose a color:</label>
      <input
        id="color-picker"
        type="color"
        onChange={handleColorChange}
      />
    </div>
  );
};

export default ThemeToggler;