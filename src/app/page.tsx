'use client'

import Image from "next/image";
import { useContext, useState } from "react";
import { ThemeContext, useTheme } from "@/components/theme-provider";
import FontPicker from "@/components/font-picker";
import ThemeToggler from "@/components/theme-toggler";
import LogoUpdater from "@/components/logo-updater";

const Home = () => {
  // const { theme, updateTheme } = useTheme();
  const { theme } = useContext(ThemeContext);


  return (
    <div style={{backgroundColor: theme.color}}>
      <h1>hello world</h1>
      <FontPicker />
      <ThemeToggler />
      <LogoUpdater />
    </div>
  );
};

export default Home;
