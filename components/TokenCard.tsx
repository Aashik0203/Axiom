import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Token } from '../types';
import { Copy, Shield, Globe, MessageCircle, Twitter, Zap, User, Trophy, Crown, Leaf, Search, Hand, Camera } from 'lucide-react';
import { Badge, LivePrice, PercentBadge } from './ui/Primitives';

interface TokenCardProps {
  token: Token;
}

const ImagePreviewPortal = ({ src, position }: { src: string, position: { top: number, left: number } }) => {
  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  return createPortal(
    <div 
      className="fixed z-[100] pointer-events-none animate-in fade-in zoom-in-95 duration-200"
      style={{ 
        top: Math.max(10, position.top - 100), // Try to center vertically relative to mouse or keep on screen
        left: position.left + 20 
      }}
    >
      <div className="bg-surface border border-border p-1 rounded-xl shadow-2xl shadow-black/80 w-[280px] h-[280px] relative overflow-hidden">
        <img src={src} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        {/* Overlay Info mimicking the screenshot banner style */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">$AIPAC</h3>
          <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
            <span>Track AIPAC</span>
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  );
};

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [cursorPos, setCursorPos] = useState({ top: 0, left: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHoveringImage(true);
    const rect = imageRef.current?.getBoundingClientRect();
    if (rect) {
        setCursorPos({ top: rect.top, left: rect.right });
    }
  };

  const handleMouseLeave = () => {
    setIsHoveringImage(false);
  };

  return (
    <div className="group relative flex flex-col p-3 bg-surface border-b border-border hover:bg-[#161616] transition-all duration-200 cursor-pointer">
      {isHoveringImage && <ImagePreviewPortal src={token.image} position={cursorPos} />}
      
      {/* Top Row: Image + Main Info + Stats */}
      <div className="flex gap-3">
        {/* Token Image */}
        <div 
            ref={imageRef}
            className="relative shrink-0 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
          <img 
            src={token.image} 
            alt={token.name} 
            className="w-[52px] h-[52px] rounded-lg object-cover border border-border shadow-sm group-hover:opacity-90 transition-opacity"
          />
          {/* Camera Overlay on Hover */}
          {isHoveringImage && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <Camera size={20} className="text-white" />
            </div>
          )}
          {/* Chain Icon Overlay */}
          <div className="absolute -bottom-1.5 -right-1.5 bg-[#111] rounded-full p-[2px] border border-[#222]">
             <div className="w-3.5 h-3.5 bg-[#F3BA2F] rounded-full grid place-items-center">
                <span className="text-[8px] font-bold text-black"></span>
             </div>
          </div>
        </div>

        {/* Middle Column: Identity & Security */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[13px] font-bold text-textMain truncate leading-tight hover:underline decoration-1 underline-offset-2">{token.name}</h3>
            <span className="text-xs text-textMuted truncate font-medium">Track {token.name}</span>
            <Copy size={12} className="text-textMuted hover:text-primary cursor-pointer" />
          </div>

          {/* Metrics Row: Time | Leaf | Hand | Search | Users | Trophy | Crown */}
          <div className="flex items-center gap-3 text-[11px] text-textMuted mt-1">
             <span className={`font-mono font-medium ${parseInt(token.createdTime) < 10 ? 'text-success' : 'text-textMuted'}`}>
               {token.createdTime}
             </span>
             
             <div className="flex items-center gap-2">
                <Leaf size={12} className="text-success fill-current" />
                <Hand size={12} className="text-gray-200 fill-current" />
                <Search size={12} className="text-gray-400" />
             </div>

             <div className="flex items-center gap-3 ml-1">
                <div className="flex items-center gap-1 text-textMuted">
                    <User size={12} className="text-gray-500" />
                    <span>{token.holders}</span>
                </div>
                <div className="flex items-center gap-1 text-textMuted">
                    <Trophy size={12} className="text-gray-500" />
                    <span>0</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                    <Crown size={12} className="fill-current" />
                    <span className="text-textMuted">{token.top10Hold}/285</span>
                </div>
             </div>
          </div>
          
          {/* Badges Row */}
          <div className="flex items-center gap-2 mt-1.5">
             <div className="flex items-center gap-1 px-1.5 py-[1px] rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400">
                <User size={10} className="fill-current" />
                1%
             </div>
             <div className="flex items-center gap-1 px-1.5 py-[1px] rounded bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400">
                <Shield size={10} className="fill-current" />
                DS
             </div>
              <div className="flex items-center gap-1 px-1.5 py-[1px] rounded bg-red-500/10 border border-red-500/20 text-[10px] text-red-400">
                <div className="w-2 h-2 rounded-full border border-current flex items-center justify-center text-[6px]">!</div>
                16%
             </div>
          </div>
        </div>

        {/* Right Column: Financials */}
        <div className="flex flex-col items-end justify-start min-w-[80px]">
          <div className="text-right mb-auto">
            <div className="text-[11px] text-textMuted flex items-center justify-end gap-1">
              <span className="text-[9px] uppercase opacity-70">MC</span>
              <LivePrice value={token.marketCap} className="font-bold text-[#00e5ff] text-[13px]" />
            </div>
            <div className="text-[10px] text-textMuted flex items-center justify-end gap-1">
              <span className="text-[9px] uppercase opacity-70">V</span>
              <span className="text-white font-medium">${(token.volume / 1000).toFixed(0)}K</span>
            </div>
             <div className="text-[10px] text-textMuted flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[9px] uppercase opacity-70">TX</span>
              <span className="text-white font-medium">{token.transactions}</span>
              {/* Progress Bar */}
              <div className="w-8 h-1 bg-zinc-800 rounded-full ml-1 overflow-hidden">
                <div className="h-full bg-success w-3/4"></div>
              </div>
            </div>
          </div>
          
          {/* Quick Action Button */}
          <button className="mt-2 px-3 py-1 bg-[#3b82f6] hover:bg-blue-600 text-[11px] text-white rounded-full font-bold transition-colors flex items-center gap-1 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
            <Zap size={10} className="fill-current" />
            0 BNB
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;