import React from 'react';
import { Search, Wallet, Settings, Star, LayoutDashboard, Bell, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border h-14 flex items-center px-4 justify-between shadow-lg shadow-black/20">
      {/* Logo & Primary Nav */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-white">
          <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
          AXIOM <span className="text-textMuted text-sm font-normal ml-1">Pro</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-textMuted">
          <a href="#" className="hover:text-white transition-colors">Discover</a>
          <a href="#" className="text-primary">Pulse</a>
          <a href="#" className="hover:text-white transition-colors">Trackers</a>
          <a href="#" className="hover:text-white transition-colors">Perpetuals</a>
          <a href="#" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#" className="hover:text-white transition-colors">Rewards</a>
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary w-4 h-4 transition-colors" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted text-[10px] border border-border px-1.5 rounded bg-[#1a1a1a]">/</div>
          <input 
            type="text" 
            placeholder="Search by token or CA..." 
            className="bg-surface border border-border rounded-full pl-9 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-primary w-64 transition-all placeholder:text-zinc-600"
          />
        </div>

        {/* Chain Selector */}
        <button className="hidden md:flex items-center gap-2 bg-[#1a1a1a] border border-border px-3 py-1.5 rounded-full text-sm text-white hover:border-zinc-600">
           <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
           <span>BNB</span>
           <span className="text-[10px] text-textMuted">▼</span>
        </button>

        {/* Deposit Button */}
        <button className="hidden md:block bg-primary hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-[0_0_10px_rgba(59,130,246,0.3)]">
          Deposit
        </button>

        {/* Icons */}
        <button className="p-2 text-textMuted hover:text-white"><Star size={18} /></button>
        <button className="hidden md:block p-2 text-textMuted hover:text-white"><LayoutDashboard size={18} /></button>
        
        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-textMuted hover:text-white">
            <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center gap-2 ml-2 border-l border-border pl-3">
           <div className="flex flex-col items-end leading-none">
              <span className="text-[10px] text-textMuted">Wallet</span>
              <span className="text-xs font-bold text-white">0 <span className="text-yellow-500">BNB</span></span>
           </div>
           <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;