import {
  findAllMarkets,
  MarketAccount,
  BookSideAccount,
  OPENBOOK_PROGRAM_ID,
  OpenBookV2Client,
} from "@openbook-dex/openbook-v2";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  useOpenbookClient,
  useHookConnection,
  useFakeProvider,
} from "../hooks/useOpenbookClient";
import { useWalletContext } from "@/context-api/ClientWalletProvider";

// MAINNET
// export const RPC = "https://misty-wcb8ol-fast-mainnet.helius-rpc.com/";
// DEVNET
export const RPC = "https://aimil-f4d13p-fast-devnet.helius-rpc.com/";

// export const RPC = "https://black-red-diagram.solana-mainnet.quiknode.pro/8d9d8dd1ac14594b29ec452f8cd64a49087309e1/";

export const fetchData = async (rpc: string) => {
  console.log(rpc)
  const connection = useHookConnection(rpc);
  const provider = useFakeProvider(rpc);
  let markets = await findAllMarkets(connection, OPENBOOK_PROGRAM_ID, provider);
  return markets;
};

export const getMarket = async (
  client: OpenBookV2Client,
  publicKey: string
): Promise<MarketAccount> => {
  let market = await client.getMarketAccount(new PublicKey(publicKey));
  console.log("get markey pub key:", publicKey)
  const fetchedMarket = market ? market : ({} as MarketAccount);
  console.log("Fetched market:", fetchedMarket);
  return fetchedMarket;
}; 
