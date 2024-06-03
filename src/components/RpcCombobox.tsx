'use client';

import React, { useEffect, useState } from 'react';
import { useWalletContext } from '@/context-api/ClientWalletProvider'; // Adjust the import path as necessary
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const rpcEndpoints = [
  { value: 'mainnet-beta', label: 'Mainnet' },
  { value: 'testnet', label: 'Testnet' },
  { value: 'devnet', label: 'Devnet' },
];

export default function RpcSelectorCombobox() {
  const [selectedRpc, setSelectedRpc] = useState('');
  const { network, customRpc, updateNetwork, updateCustomRpc } = useWalletContext();

  useEffect(() => {
    setSelectedRpc(network);
  }, [network]);

  const handleNetworkSelect = (event: string) => {
    const currentValue = event;
    console.log(currentValue)
    if (currentValue === 'mainnet-beta') {
      updateNetwork(WalletAdapterNetwork.Mainnet);
      // updateCustomRpc('https://misty-wcb8ol-fast-mainnet.helius-rpc.com/');
    } else if (currentValue === 'devnet') {
      updateNetwork(WalletAdapterNetwork.Devnet)
      // updateCustomRpc('https://aimil-f4d13p-fast-devnet.helius-rpc.com/')
    } else if (currentValue === 'testnet') {
      updateNetwork(WalletAdapterNetwork.Testnet)
    }
    // setSelectedRpc(currentValue);
  };

  const handleCustomRpcChange = (event: { target: { value: string; }; }) => {
    updateCustomRpc(event.target.value);
  };


  return (
    <div>
      <Select onValueChange={(e) => handleNetworkSelect(e)} defaultValue={network}>
      <SelectTrigger className="w-[180px] border border-[#ADA7C3]">
        <SelectValue placeholder="Select RPC endpoint..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>RPC Networks</SelectLabel>
          {rpcEndpoints.map((endpoint, index) => (
          <SelectItem key={index} value={endpoint.value}>
            {endpoint.label}
          </SelectItem>
        ))}
        </SelectGroup>
      </SelectContent>
    </Select>

      {/* {selectedRpc === 'custom' && (
        <div className="mt-2">
          <label htmlFor="custom-rpc">Custom RPC:</label>
          <input
            id="custom-rpc"
            type="text"
            value={customRpc}
            onChange={handleCustomRpcChange}
            className="w-full mt-2 p-2 border rounded"
            placeholder="Enter custom RPC endpoint"
          />
        </div>
      )} */}
    </div>
  );
}

