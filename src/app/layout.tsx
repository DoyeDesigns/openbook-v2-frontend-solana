// require("@solana/wallet-adapter-react-ui/styles.css");

import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context-api/themeContextProvider";
import { LogoProvider } from "@/context-api/logoContextProvider";
import { FontProvider } from "@/context-api/fontContextProvider";
import ThemeWrapper from "@/components/BackgroundWrapper";

import React from "react";
import WalletButton from "@/components/WalletButton";

import { WalletContextProvider } from "@/context-api/ClientWalletProvider";
import SideNavBar from "@/components/SideNavBar";
import RpcSelectorCombobox from "@/components/RpcCombobox";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider>
          <ThemeProvider>
            <LogoProvider>
              <FontProvider>
                <ThemeWrapper>
                  <main className="text-[#ADA7C3]">
                    <div className="flex">
                      <aside>
                        <SideNavBar />
                      </aside>
                      <div className="flex-1 relative p-5 h-screen overflow-auto">
                        <div className="flex justify-end absolute top-0 left-0 w-full items-center border border-l-0 border-[#ADA7C3]">
                          {/* <Logo /> */}
                          <div className="flex justify-between items-center gap-2">
                            <RpcSelectorCombobox />
                            <WalletButton />
                          </div>
                        </div>
                        {children}
                      </div>
                    </div>
                    <Footer />
                  </main>
                  <Toaster />
                </ThemeWrapper>
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js" />
              </FontProvider>
            </LogoProvider>
          </ThemeProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
