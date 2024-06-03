'use client'
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { WalletProvider, ConnectionProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletError, WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

type WalletContextValue = {
  network: WalletAdapterNetwork;
  customRpc: string;
  updateNetwork: (newNetwork: WalletAdapterNetwork) => void;
  updateCustomRpc: (newRpc: string) => void;
};

const WalletContext = createContext<WalletContextValue>({
  network: WalletAdapterNetwork.Devnet,
  customRpc: '',
  updateNetwork: () => {},
  updateCustomRpc: () => {},
});

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

export const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [network, setNetwork] = useState<WalletAdapterNetwork>(WalletAdapterNetwork.Devnet);
  const [customRpc, setCustomRpc] = useState<string>('');

  useEffect(() => {
    const savedNetwork = localStorage.getItem('network') as WalletAdapterNetwork;
    if (savedNetwork) {
      setNetwork(savedNetwork);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('network', network);
  }, [network]);

  const endpoint = useMemo(() => (customRpc ? customRpc : clusterApiUrl(network)), [network, customRpc]);

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  const updateNetwork = useCallback((newNetwork: WalletAdapterNetwork) => {
    setNetwork(newNetwork);
  }, []);

  const updateCustomRpc = useCallback((newRpc: string) => {
    setCustomRpc(newRpc);
  }, []);

  const value = useMemo(() => ({ network, customRpc, updateNetwork, updateCustomRpc }), [network, customRpc, updateNetwork, updateCustomRpc]);

  const ReactUIWalletModalProviderDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
    { ssr: false }
  );

  return (
    <WalletContext.Provider value={value}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} onError={onError}>
          <ReactUIWalletModalProviderDynamic>
            <WalletModalProvider>{children}</WalletModalProvider>
          </ReactUIWalletModalProviderDynamic>
        </WalletProvider>
      </ConnectionProvider>
    </WalletContext.Provider>
  );
};