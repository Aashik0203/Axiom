import React from 'react';
import { Token, TokenStatus } from '../types';
import TokenCard from './TokenCard';
import { Settings2, Zap } from 'lucide-react';
import { Skeleton } from './ui/Primitives';

interface ColumnProps {
  title: TokenStatus;
  tokens: Token[];
  loading: boolean;
  icon?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ title, tokens, loading, icon }) => {
  return (
    <div className="flex flex-col h-full border-r border-border last:border-r-0 bg-[#050505]">
      {/* Column Header */}
      <div className="sticky top-0 z-10 bg-[#050505]/95 backdrop-blur-sm border-b border-border p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
           {icon}
           <h2 className="text-sm font-bold text-white tracking-wide uppercase">{title}</h2>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="relative">
             <input 
               type="text" 
               placeholder="Filter..." 
               className="bg-surface border border-border rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-primary w-32 placeholder:text-zinc-700"
             />
           </div>
           <div className="flex items-center gap-1 bg-surface border border-border rounded p-0.5">
              <button className="p-1 hover:bg-white/10 rounded"><Zap size={12} className="text-yellow-500" /></button>
              <div className="w-[1px] h-3 bg-border"></div>
              <span className="text-[10px] text-textMuted px-1">P1</span>
           </div>
           <Settings2 size={14} className="text-textMuted cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {loading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-full h-10" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {tokens.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
            {tokens.length === 0 && (
                <div className="p-8 text-center text-textMuted text-xs">No tokens found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;