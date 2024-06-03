'use client'

import React, { useContext } from "react";
import { ThemeContext } from "../context-api/themeContextProvider";
import PageSubTitle from './PageSubTitle';

const ThemeToggler = () => {
  const { updateTheme } = useContext(ThemeContext);

  const handleColorChange = (e: { target: { value: string } }) => {
    updateTheme(e.target.value);
  };

  return (
    <div className="flex items-center gap-3 my-5">
      <PageSubTitle text='Change Background Colour' />
      <label htmlFor="color-picker">Choose a color:</label>
      <input
        id="color-picker"
        type="color"
        className="h-14 w-14 border border-[#ADA7C3] rounded-full"
        onChange={handleColorChange}
      />
    </div>
  );
};

export default ThemeToggler;
