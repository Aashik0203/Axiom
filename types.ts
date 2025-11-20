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
  createdTime: string; // e.g., "6m", "1h"
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
  protocol?: string;
  quoteToken?: string;
  devHolding?: number; // Mocked for filters
  snipers?: number; // Mocked for filters
}

export interface SortConfig {
  key: keyof Token;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  protocols: string[];
  quoteTokens: string[];
  search: string;
  exclude: string;
  dexPaid: boolean;
  minAge: string;
  maxAge: string;
  minTop10: string;
  maxTop10: string;
  minDevHolding: string;
  maxDevHolding: string;
  minSnipers: string;
  maxSnipers: string;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  protocols: [],
  quoteTokens: [],
  search: '',
  exclude: '',
  dexPaid: false,
  minAge: '',
  maxAge: '',
  minTop10: '',
  maxTop10: '',
  minDevHolding: '',
  maxDevHolding: '',
  minSnipers: '',
  maxSnipers: '',
};