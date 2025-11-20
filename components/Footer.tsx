import React from 'react';
import { Settings, Wallet, Twitter, Compass, Activity, BarChart2, Globe, Layout, Bell, Palette, Disc as Discord, FileText, Hand } from 'lucide-react';

const FooterItem = ({ children, badge = false, active = false }: { children: React.ReactNode, badge?: boolean, active?: boolean }) => (
  <button className={`flex items-center gap-2 px-3 py-1 rounded hover:text-white transition-colors relative group ${active ? 'text-white' : 'text-[#a1a1aa]'}`}>
    {children}
    {badge && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
  </button>
);

const Footer = () => {
  return (
    <div className="hidden md:flex h-9 bg-[#050505] border-t border-border items-center justify-between px-2 select-none text-[11px] font-medium relative z-50">
      
      {/* Left: Preset & Wallet Summary */}
      <div className="flex items-center gap-2 h-full">
        <button className="flex items-center gap-1.5 bg-[#1e293b] text-[#60a5fa] px-3 py-1 rounded border border-[#3b82f6]/20 hover:bg-[#1e293b]/80 transition-colors">
          <Settings size={12} />
          <span>PRESET 1</span>
        </button>
        
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/50 text-textMuted">
           <div className="flex items-center gap-1">
             <Wallet size={12} />
             <span>1</span>
           </div>
           <div className="w-[1px] h-3 bg-border"></div>
           <div className="flex items-center gap-1">
             <div className="w-3 h-3 bg-yellow-500/20 rounded-sm flex items-center justify-center text-yellow-500 text-[8px]">📦</div>
             <span>0</span>
             <span className="text-[8px]">▼</span>
           </div>
        </div>
      </div>

      {/* Center: Navigation Items */}
      <div className="flex items-center gap-1 h-full">
        <button className="p-2 text-textMuted hover:text-white"><Settings size={14} /></button>
        <div className="w-[1px] h-3 bg-border mx-1"></div>
        
        <FooterItem badge>
          <Wallet size={14} />
          <span>Wallet</span>
        </FooterItem>
        
        <FooterItem badge>
          <Twitter size={14} />
          <span>Twitter</span>
        </FooterItem>
        
        <FooterItem badge>
          <Compass size={14} />
          <span>Discover</span>
        </FooterItem>
        
        <FooterItem badge active>
          <Activity size={14} className="text-white" />
          <span>Pulse</span>
        </FooterItem>
        
        <FooterItem>
          <BarChart2 size={14} />
          <span>PnL</span>
        </FooterItem>
      </div>

      {/* Right: Status & Global & Tools */}
      <div className="flex items-center gap-3 h-full">
         {/* Binance Stats */}
         <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-yellow-900/20 border border-yellow-700/30 text-yellow-500">
            <Hand size={12} className="fill-current" />
            <span className="text-textMuted text-[10px]">$77.5K</span>
         </div>

         {/* Connection Status */}
         <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-900/20 border border-emerald-900/30 text-emerald-500">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Connection is stable</span>
         </div>

         <div className="h-3 w-[1px] bg-border"></div>
         
         <button className="flex items-center gap-1 text-textMuted hover:text-white">
            GLOBAL <span className="text-[8px]">▼</span>
         </button>

         <div className="h-3 w-[1px] bg-border"></div>

         <div className="flex items-center gap-1 text-textMuted">
            <button className="p-1.5 hover:text-white"><Layout size={14} /></button>
            <button className="p-1.5 hover:text-white"><Bell size={14} /></button>
            <button className="p-1.5 hover:text-white"><Palette size={14} /></button>
            <div className="h-3 w-[1px] bg-border mx-1"></div>
            <button className="p-1.5 hover:text-white"><Discord size={14} /></button>
            <button className="p-1.5 hover:text-white"><span className="font-bold text-xs">𝕏</span></button>
            <button className="flex items-center gap-1 p-1.5 hover:text-white">
                <FileText size={14} />
                <span>Docs</span>
            </button>
         </div>
      </div>

    </div>
  );
};

export default Footer;