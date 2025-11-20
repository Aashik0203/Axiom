import { Token, TokenStatus } from './types';

export const IMAGES = [
  'https://picsum.photos/64/64?random=1',
  'https://picsum.photos/64/64?random=2',
  'https://picsum.photos/64/64?random=3',
  'https://picsum.photos/64/64?random=4',
  'https://picsum.photos/64/64?random=5',
  'https://picsum.photos/64/64?random=6',
  'https://picsum.photos/64/64?random=7',
  'https://picsum.photos/64/64?random=8',
];

const NAMES = [
  "Moment", "KOBAN", "Molly", "Shrubby", "Minnesota", "machi mode", 
  "ZKASTER", "Chinese chives", "CZTattoo", "Dragon", "Perceptron"
];

const SYMBOLS = ["MMT", "KOBAN", "MOLLY", "SHRUB", "MINN", "MOCHI", "ZKA", "CC", "CZT", "DRG", "PERC"];

export const generateMockTokens = (count: number, status: TokenStatus): Token[] => {
  return Array.from({ length: count }).map((_, i) => {
    const nameIndex = Math.floor(Math.random() * NAMES.length);
    const isGreen = Math.random() > 0.4;
    
    return {
      id: `${status}-${i}-${Math.random()}`,
      name: NAMES[nameIndex],
      symbol: SYMBOLS[nameIndex],
      image: IMAGES[i % IMAGES.length],
      createdTime: `${Math.floor(Math.random() * 59) + 1}m`,
      marketCap: Math.random() * 100000 + 5000,
      volume: Math.random() * 50000,
      transactions: Math.floor(Math.random() * 2000),
      holders: Math.floor(Math.random() * 500),
      top10Hold: Math.floor(Math.random() * 60),
      priceChange1m: (Math.random() * 10 - 2) * (Math.random() > 0.5 ? 1 : -1),
      priceChange5m: (Math.random() * 20 - 5) * (Math.random() > 0.5 ? 1 : -1),
      priceChange1h: (Math.random() * 50 - 10) * (Math.random() > 0.5 ? 1 : -1),
      status: status,
      address: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
      badges: Math.random() > 0.5 ? ['DS', 'Paid'] : ['DS'],
      devActions: {
        burnt: Math.random() > 0.5,
        locked: Math.random() > 0.5,
        renounced: Math.random() > 0.5,
      },
      chain: 'BNB'
    };
  });
};

export const INITIAL_TOKENS = [
  ...generateMockTokens(8, TokenStatus.NEW),
  ...generateMockTokens(8, TokenStatus.FINAL),
  ...generateMockTokens(8, TokenStatus.MIGRATED),
];