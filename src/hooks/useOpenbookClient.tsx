'use client'

import { OpenBookV2Client } from "@openbook-dex/openbook-v2";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { AnchorProvider } from "@coral-xyz/anchor";
import { WalletAdapter } from "../utils/utils";
import { RPC } from "../utils/openbook";
import EmptyWallet from "./emptyWallet";
import { useProvider } from "./useProvider";
import { useWalletContext } from "@/context-api/ClientWalletProvider";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export function useOpenbookClient(): OpenBookV2Client {
  const provider = useProvider();

  let client = new OpenBookV2Client(provider);
  return client;
}


export function useHookConnection(rpc: string): Connection {
  console.log(rpc)
  const connection = new Connection(rpc);
  return connection;
}

export function useFakeProvider(rpc: string): AnchorProvider {
  return new AnchorProvider(
    useHookConnection(rpc),
    new EmptyWallet(Keypair.generate()),
    {
      /** disable transaction verification step */
      skipPreflight: true,
      /** desired commitment level */
      commitment: "confirmed",
      /** preflight commitment level */
      preflightCommitment: "confirmed",
      /** Maximum number of times for the RPC node to retry sending the transaction to the leader. */
      maxRetries: 3,
      /** The minimum slot that the request can be evaluated at */
      minContextSlot: 10,
    }
  );
}
