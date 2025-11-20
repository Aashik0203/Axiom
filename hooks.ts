import { useState, useEffect, useMemo } from 'react';
import { Token, TokenStatus, FilterState } from './types';
import { INITIAL_TOKENS } from './constants';

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

const parseTime = (timeStr: string): number => {
  const val = parseInt(timeStr);
  if (timeStr.endsWith('s')) return val / 60; // to minutes
  if (timeStr.endsWith('m')) return val;
  if (timeStr.endsWith('h')) return val * 60;
  if (timeStr.endsWith('d')) return val * 1440;
  return val;
};

export const useFilteredTokens = (tokens: Token[], filter: FilterState) => {
  return useMemo(() => {
    return tokens.filter(token => {
      // Protocol
      if (filter.protocols.length > 0 && !filter.protocols.includes(token.protocol || '')) {
        return false;
      }
      
      // Quote Token
      if (filter.quoteTokens.length > 0 && !filter.quoteTokens.includes(token.quoteToken || '')) {
        return false;
      }

      // Search
      if (filter.search) {
        const term = filter.search.toLowerCase();
        const matches = 
          token.name.toLowerCase().includes(term) || 
          token.symbol.toLowerCase().includes(term) || 
          token.address.toLowerCase().includes(term);
        if (!matches) return false;
      }

      // Exclude
      if (filter.exclude) {
        const term = filter.exclude.toLowerCase();
        const matches = 
          token.name.toLowerCase().includes(term) || 
          token.symbol.toLowerCase().includes(term);
        if (matches) return false;
      }

      // Dex Paid
      if (filter.dexPaid && !token.badges.includes('Paid')) {
        return false;
      }

      // Ranges
      const ageMins = parseTime(token.createdTime);
      if (filter.minAge && ageMins < parseFloat(filter.minAge)) return false;
      if (filter.maxAge && ageMins > parseFloat(filter.maxAge)) return false;

      if (filter.minTop10 && token.top10Hold < parseFloat(filter.minTop10)) return false;
      if (filter.maxTop10 && token.top10Hold > parseFloat(filter.maxTop10)) return false;

      if (filter.minDevHolding && (token.devHolding || 0) < parseFloat(filter.minDevHolding)) return false;
      if (filter.maxDevHolding && (token.devHolding || 0) > parseFloat(filter.maxDevHolding)) return false;

      if (filter.minSnipers && (token.snipers || 0) < parseFloat(filter.minSnipers)) return false;
      if (filter.maxSnipers && (token.snipers || 0) > parseFloat(filter.maxSnipers)) return false;

      return true;
    });
  }, [tokens, filter]);
};