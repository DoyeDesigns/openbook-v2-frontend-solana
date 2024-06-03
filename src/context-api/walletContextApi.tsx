'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { WalletProvider, ConnectionProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletError, WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

type WalletContextValue = {
  network: WalletAdapterNetwork | "custom";
  customRpc: string;
  updateNetwork: (newNetwork: WalletAdapterNetwork | "custom") => void;
  updateCustomRpc: (newRpc: string) => void;
};

const WalletContext = createContext<WalletContextValue>({
  network: WalletAdapterNetwork.Mainnet,
  customRpc: '',
  updateNetwork: () => {},
  updateCustomRpc: () => {},
});

export const useWalletContext = (): WalletContextValue => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

export const WalletProviderComponent = ({ children }: { children: React.ReactNode }) => {
  const [network, setNetwork] = useState<WalletAdapterNetwork | "custom">(WalletAdapterNetwork.Mainnet);
  const [customRpc, setCustomRpc] = useState<string>('');

  const endpoint = useMemo(() => {
    switch (network) {
      case WalletAdapterNetwork.Mainnet:
        return clusterApiUrl(WalletAdapterNetwork.Mainnet);
      case WalletAdapterNetwork.Testnet:
        return clusterApiUrl(WalletAdapterNetwork.Testnet);
      case WalletAdapterNetwork.Devnet:
        return clusterApiUrl(WalletAdapterNetwork.Devnet);
      case "custom":
        return customRpc || clusterApiUrl(WalletAdapterNetwork.Mainnet);
      default:
        return clusterApiUrl(WalletAdapterNetwork.Mainnet); // Default to Mainnet if no valid network is selected
    }
  }, [network, customRpc]);


  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  const updateNetwork = useCallback((newNetwork: WalletAdapterNetwork | "custom") => {
    setCustomRpc(''); // Reset custom RPC when changing network
    setNetwork(newNetwork);
    console.log(endpoint)
  }, []);

  const updateCustomRpc = useCallback((newRpc: string) => {
    setNetwork("custom");
    setCustomRpc(newRpc);
  }, []);

  const value = useMemo(() => ({ network, customRpc, updateNetwork, updateCustomRpc }), [network, customRpc, updateNetwork, updateCustomRpc]);

  return (
    <WalletContext.Provider value={value}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} onError={onError}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </WalletContext.Provider>
  );
};
