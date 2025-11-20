export enum TokenStatus {
  NEW = 'New Pairs',
  FINAL = 'Final Stretch',
  MIGRATED = 'Migrated'
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  image: string;
  createdTime: string; // e.g., "6m"
  marketCap: number;
  volume: number;
  transactions: number;
  holders: number;
  top10Hold: number; // Percentage
  priceChange1m: number;
  priceChange5m: number;
  priceChange1h: number;
  status: TokenStatus;
  address: string;
  badges: string[]; // e.g., "DS", "Paid"
  devActions: {
    burnt: boolean;
    locked: boolean;
    renounced: boolean;
  };
  chain: 'BNB' | 'ETH' | 'SOL';
}

export interface SortConfig {
  key: keyof Token;
  direction: 'asc' | 'desc';
}