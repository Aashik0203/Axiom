import React from 'react';
import { Token, TokenStatus } from '../types';
import TokenCard from './TokenCard';
import { Settings2, Zap, Box } from 'lucide-react';
import { Skeleton } from './ui/Primitives';

interface ColumnProps {
  title: TokenStatus;
  tokens: Token[];
  loading: boolean;
  onOpenFilter?: () => void;
}

const Column: React.FC<ColumnProps> = ({ title, tokens, loading, onOpenFilter }) => {
  return (
    <div className="flex flex-col h-full border-r border-border last:border-r-0 bg-[#050505]">
      {/* Column Header - Updated to match screenshot */}
      <div className="sticky top-0 z-10 bg-[#050505] border-b border-border h-[52px] flex items-center justify-between px-3 group shrink-0">
        <div className="font-bold text-white text-[15px]">{title}</div>
        
        <div className="flex items-center gap-2">
            {/* Search Input Pill - Visible on Large Screens */}
            <div className="relative hidden lg:block">
                <input 
                    type="text" 
                    placeholder="Search by ticker or name" 
                    className="bg-[#111] border border-[#27272a] rounded-full pl-3 pr-2 py-1 text-[11px] text-white focus:outline-none focus:border-zinc-600 w-32 xl:w-36 placeholder:text-zinc-600 transition-all focus:w-40"
                />
            </div>
            
            {/* Flash/Lightning Widget */}
            <div className="flex items-center gap-1.5 bg-[#111] border border-[#27272a] rounded px-2 py-1 hover:border-zinc-600 transition-colors cursor-pointer">
                <Zap size={10} className="text-textMuted fill-current" />
                <span className="text-[11px] font-medium text-textMuted">0</span>
            </div>

            {/* Yellow Cube Widget */}
            <button className="p-1.5 hover:bg-[#111] rounded text-[#F3BA2F]">
                <Box size={14} className="fill-current stroke-[1.5px]" />
            </button>

            {/* P Levels Selector */}
            <div className="flex items-center gap-1 text-[11px] font-medium px-1 select-none">
                <span className="text-blue-500 cursor-pointer hover:text-blue-400">P1</span>
                <span className="text-zinc-600 cursor-pointer hover:text-zinc-400 ml-1">P2</span>
                <span className="text-zinc-600 cursor-pointer hover:text-zinc-400 ml-1">P3</span>
            </div>

            {/* Filter/Settings */}
            <button 
                onClick={onOpenFilter}
                className="p-1.5 hover:bg-[#111] rounded text-textMuted hover:text-white"
            >
                <Settings2 size={14} />
            </button>
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
                <div className="p-8 text-center text-textMuted text-xs">No tokens found matching filters</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;