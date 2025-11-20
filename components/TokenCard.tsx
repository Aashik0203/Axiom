import React from 'react';
import { Token } from '../types';
import { Copy, Shield, Globe, MessageCircle, Twitter, Zap, User, Trophy } from 'lucide-react';
import { Badge, LivePrice, PercentBadge } from './ui/Primitives';

interface TokenCardProps {
  token: Token;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  return (
    <div className="group relative flex flex-col p-3 bg-surface border-b border-border hover:bg-[#161616] transition-all duration-200 cursor-pointer">
      {/* Top Row: Image + Main Info + Stats */}
      <div className="flex gap-3">
        {/* Token Image */}
        <div className="relative shrink-0">
          <img 
            src={token.image} 
            alt={token.name} 
            className="w-14 h-14 rounded-lg object-cover border border-border shadow-sm"
          />
          {/* Chain Icon Overlay */}
          <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5 border border-border">
             <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full" title="BNB Chain" />
          </div>
        </div>

        {/* Middle Column: Identity & Security */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-textMain truncate leading-tight">{token.name}</h3>
            <span className="text-xs text-textMuted truncate font-medium">{token.symbol}</span>
            <Copy size={10} className="text-textMuted hover:text-primary cursor-pointer" />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-textMuted mt-0.5">
             <span className={`font-mono ${parseInt(token.createdTime) < 10 ? 'text-success' : 'text-textMuted'}`}>
               {token.createdTime}
             </span>
             <div className="flex items-center gap-1 text-textMuted">
                <Shield size={10} className={token.devActions.renounced ? "text-success" : "text-textMuted"} />
                <Globe size={10} />
                <Twitter size={10} />
             </div>
          </div>
          
          <div className="flex items-center gap-3 mt-1 text-[10px] text-textMuted">
             <div className="flex items-center gap-1">
               <User size={10} />
               <span>{token.holders}</span>
             </div>
             <div className="flex items-center gap-1" title="Top 10 Holders">
               <Trophy size={10} />
               <span className={token.top10Hold > 50 ? "text-orange-400" : "text-textMuted"}>{token.top10Hold}%</span>
             </div>
          </div>
        </div>

        {/* Right Column: Financials */}
        <div className="flex flex-col items-end justify-between min-w-[80px]">
          <div className="text-right">
            <div className="text-xs text-textMuted flex items-center justify-end gap-1">
              <span className="text-[10px]">MC</span>
              <LivePrice value={token.marketCap} className="font-bold text-cyan-400 text-sm" />
            </div>
            <div className="text-[10px] text-textMuted mt-0.5">
              V <span className="text-white">${(token.volume / 1000).toFixed(1)}K</span>
            </div>
             <div className="text-[10px] text-textMuted mt-0.5">
              TX <span className="text-white">{token.transactions}</span>
            </div>
          </div>
          
          {/* Quick Action Button */}
          <button className="mt-1 px-2 py-0.5 bg-[#374151] hover:bg-primary text-[10px] text-white rounded font-medium transition-colors flex items-center gap-1">
            <Zap size={10} className="fill-current" />
            0 BNB
          </button>
        </div>
      </div>

      {/* Bottom Row: Detailed Stats & Badges */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-white/5">
        <div className="flex gap-3 text-[10px] font-medium">
          <div className="flex items-center gap-1" title="1 minute change">
            <LivePrice value={token.priceChange1m} format="percent" className={token.priceChange1m >= 0 ? 'text-success' : 'text-danger'} />
          </div>
          <div className="flex items-center gap-1 text-textMuted" title="5 minute change">
            <span className="opacity-50">5m</span>
             <span className={token.priceChange5m >= 0 ? 'text-success' : 'text-danger'}>{token.priceChange5m > 0 ? '+' : ''}{token.priceChange5m.toFixed(0)}%</span>
          </div>
           <div className="flex items-center gap-1 text-textMuted" title="1 hour change">
            <span className="opacity-50">1h</span>
             <span className={token.priceChange1h >= 0 ? 'text-success' : 'text-danger'}>{token.priceChange1h > 0 ? '+' : ''}{token.priceChange1h.toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex gap-1">
          {token.badges.map(badge => (
             <Badge key={badge} className={badge === 'Paid' ? "bg-green-900/30 text-green-400 border border-green-900/50" : "bg-blue-900/30 text-blue-400 border border-blue-900/50"}>
               {badge}
             </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenCard;