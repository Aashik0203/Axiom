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

export const PROTOCOLS = ['Four.meme', 'X Mode', 'Pump.fun'];
export const QUOTE_TOKENS = ['WBNB', 'BNB', 'USDT', 'USD1', 'CAKE', 'ASTER', 'LISUSD', 'USDC'];

export const generateMockTokens = (count: number, status: TokenStatus): Token[] => {
  return Array.from({ length: count }).map((_, i) => {
    const nameIndex = Math.floor(Math.random() * NAMES.length);
    
    // Generate random age strings: 30s, 5m, 1h
    const timeUnit = Math.random() > 0.8 ? 's' : Math.random() > 0.2 ? 'm' : 'h';
    const timeVal = timeUnit === 's' ? Math.floor(Math.random() * 59) + 1 
                  : timeUnit === 'm' ? Math.floor(Math.random() * 59) + 1 
                  : Math.floor(Math.random() * 23) + 1;
    const createdTime = `${timeVal}${timeUnit}`;

    return {
      id: `${status}-${i}-${Math.random()}`,
      name: NAMES[nameIndex],
      symbol: SYMBOLS[nameIndex],
      image: IMAGES[i % IMAGES.length],
      createdTime: createdTime,
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
      badges: Math.random() > 0.7 ? ['DS', 'Paid'] : ['DS'],
      devActions: {
        burnt: Math.random() > 0.5,
        locked: Math.random() > 0.5,
        renounced: Math.random() > 0.5,
      },
      chain: 'BNB',
      protocol: PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)],
      quoteToken: QUOTE_TOKENS[Math.floor(Math.random() * QUOTE_TOKENS.length)],
      devHolding: Math.floor(Math.random() * 20),
      snipers: Math.floor(Math.random() * 10),
    };
  });
};

export const INITIAL_TOKENS = [
  ...generateMockTokens(8, TokenStatus.NEW),
  ...generateMockTokens(8, TokenStatus.FINAL),
  ...generateMockTokens(8, TokenStatus.MIGRATED),
];