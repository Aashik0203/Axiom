import { useState, useEffect, useMemo } from 'react';
import { Token, TokenStatus, SortConfig } from './types';
import { INITIAL_TOKENS, generateMockTokens } from './constants';

// Simulates WebSocket updates
export const useTokenData = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setTokens(INITIAL_TOKENS);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // "WebSocket" simulation
  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      setTokens(currentTokens => {
        // Randomly update 3-5 tokens
        const tokensToUpdateCount = Math.floor(Math.random() * 3) + 2;
        const newTokens = [...currentTokens];
        
        for (let i = 0; i < tokensToUpdateCount; i++) {
          const idx = Math.floor(Math.random() * newTokens.length);
          const token = newTokens[idx];
          
          // Update Market Cap slightly to trigger visual change
          const change = (Math.random() - 0.5) * 200; // +/- $100
          newTokens[idx] = {
            ...token,
            marketCap: Math.max(0, token.marketCap + change),
            priceChange1m: token.priceChange1m + (Math.random() - 0.5),
            transactions: token.transactions + Math.floor(Math.random() * 3)
          };
        }
        return newTokens;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [loading]);

  return { tokens, loading };
};

export const useSortedTokens = (tokens: Token[], status: TokenStatus) => {
  return useMemo(() => {
    return tokens.filter(t => t.status === status);
  }, [tokens, status]);
};