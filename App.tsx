import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Column from './components/Column';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import FilterModal from './components/FilterModal';
import { useTokenData, useSortedTokens, useFilteredTokens } from './hooks';
import { TokenStatus, FilterState, DEFAULT_FILTER_STATE } from './types';
import { Sprout, Trophy, Target, Box, List, ChevronDown, Bookmark, Volume2, Folder, Menu } from 'lucide-react';

// Simulating Next.js App Router Layout
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-background text-textMain overflow-hidden selection:bg-primary/30 font-sans antialiased">
      <Navbar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {children}
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
};

// Simulating Page Component
const Page = () => {
  const { tokens, loading } = useTokenData();
  const [activeMobileTab, setActiveMobileTab] = useState<TokenStatus>(TokenStatus.NEW);
  
  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<TokenStatus>(TokenStatus.NEW);
  const [filters, setFilters] = useState<Record<TokenStatus, FilterState>>({
    [TokenStatus.NEW]: DEFAULT_FILTER_STATE,
    [TokenStatus.FINAL]: DEFAULT_FILTER_STATE,
    [TokenStatus.MIGRATED]: DEFAULT_FILTER_STATE,
  });

  // Get tokens by status
  const newTokensRaw = useSortedTokens(tokens, TokenStatus.NEW);
  const finalTokensRaw = useSortedTokens(tokens, TokenStatus.FINAL);
  const migratedTokensRaw = useSortedTokens(tokens, TokenStatus.MIGRATED);

  // Apply filters
  const newTokens = useFilteredTokens(newTokensRaw, filters[TokenStatus.NEW]);
  const finalTokens = useFilteredTokens(finalTokensRaw, filters[TokenStatus.FINAL]);
  const migratedTokens = useFilteredTokens(migratedTokensRaw, filters[TokenStatus.MIGRATED]);

  const handleOpenFilter = (tab: TokenStatus) => {
    setActiveFilterTab(tab);
    setIsFilterOpen(true);
  };

  const handleApplyFilter = (newFilterState: FilterState) => {
    setFilters(prev => ({
      ...prev,
      [activeFilterTab]: newFilterState
    }));
    setIsFilterOpen(false);
  };

  const tabs = [
    { id: TokenStatus.NEW, label: 'New Pairs', icon: <Sprout size={14} className="text-green-400" /> },
    { id: TokenStatus.FINAL, label: 'Final Stretch', icon: <Trophy size={14} className="text-yellow-400" /> },
    { id: TokenStatus.MIGRATED, label: 'Migrated', icon: <Target size={14} className="text-blue-400" /> },
  ];

  return (
    <>
      <FilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeTab={activeFilterTab}
        onTabChange={setActiveFilterTab}
        filters={filters[activeFilterTab]}
        onApply={handleApplyFilter}
      />

      {/* Pulse Header Bar - Pixel Perfect Replica */}
      <div className="h-[52px] border-b border-border bg-[#050505] flex items-center justify-between px-4 shrink-0 z-20">
          {/* Left: Title & Icons */}
          <div className="flex items-center gap-4">
              <h1 className="text-[20px] font-bold text-white tracking-tight">Pulse</h1>
              <div className="flex items-center gap-2">
                   {/* Stylized Menu Icon (Cyan/Blue/Purple stack) */}
                   <button className="p-1.5 hover:bg-white/5 rounded transition-colors group">
                      <div className="flex flex-col gap-[3px] items-start">
                        <div className="w-4 h-[2px] bg-[#22d3ee] group-hover:bg-[#67e8f9] rounded-full shadow-[0_0_5px_#22d3ee]"></div>
                        <div className="w-4 h-[2px] bg-[#3b82f6] group-hover:bg-[#60a5fa] rounded-full shadow-[0_0_5px_#3b82f6]"></div>
                        <div className="w-4 h-[2px] bg-[#a855f7] group-hover:bg-[#c084fc] rounded-full shadow-[0_0_5px_#a855f7]"></div>
                      </div>
                   </button>
                   {/* Yellow Cube */}
                   <button className="p-1.5 hover:bg-white/5 rounded text-[#F3BA2F] transition-colors">
                      <Box size={18} className="fill-current stroke-[1.5px]" />
                   </button>
              </div>
          </div>

          {/* Right: Controls */}
          <div className="hidden md:flex items-center gap-2">
              {/* Display Dropdown */}
              <button className="flex items-center gap-2 bg-[#161616] border border-border hover:border-zinc-600 hover:bg-[#1c1c1c] px-3 py-1.5 rounded-full text-xs font-bold text-white transition-all shadow-sm">
                  <List size={14} />
                  Display
                  <ChevronDown size={12} className="text-textMuted ml-0.5" />
              </button>
              
              {/* Quick Actions */}
              <button className="p-2 text-textMuted hover:text-white transition-colors hover:bg-white/5 rounded-full">
                  <Bookmark size={16} />
              </button>
              <button className="p-2 text-textMuted hover:text-white transition-colors hover:bg-white/5 rounded-full">
                   <Volume2 size={16} />
              </button>

              {/* Wallet Stats Dropdown */}
              <button className="flex items-center gap-3 bg-[#161616] border border-border hover:border-zinc-600 hover:bg-[#1c1c1c] px-3 py-1.5 rounded-full text-xs text-white transition-all ml-1 shadow-sm">
                   <div className="flex items-center gap-1.5">
                      <Folder size={14} className="text-[#94a3b8]" />
                      <span className="font-medium">1</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Box size={14} className="text-[#F3BA2F] fill-current" />
                      <span className="font-medium">0</span>
                   </div>
                   <ChevronDown size={12} className="text-textMuted ml-0.5" />
              </button>
          </div>
      </div>

      {/* Main Grid Content */}
      <main className="flex-1 overflow-hidden relative bg-[#050505]">
        
        {/* Mobile Tabs */}
        <div className="md:hidden flex border-b border-border bg-[#0a0a0a]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveMobileTab(tab.id)}
              className={`flex-1 py-3 text-xs font-medium flex items-center justify-center gap-2 relative transition-colors
                ${activeMobileTab === tab.id ? 'text-white' : 'text-textMuted hover:text-zinc-300'}
              `}
            >
              {tab.icon}
              {tab.label}
              {activeMobileTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-full pb-20 md:pb-0">
          {/* New Pairs Column */}
          <div className={`h-full overflow-hidden ${activeMobileTab === TokenStatus.NEW ? 'block' : 'hidden md:block'}`}>
             <Column 
                title={TokenStatus.NEW} 
                tokens={newTokens} 
                loading={loading}
                onOpenFilter={() => handleOpenFilter(TokenStatus.NEW)}
             />
          </div>

          {/* Final Stretch Column */}
          <div className={`h-full overflow-hidden ${activeMobileTab === TokenStatus.FINAL ? 'block' : 'hidden md:block'}`}>
             <Column 
                title={TokenStatus.FINAL} 
                tokens={finalTokens} 
                loading={loading}
                onOpenFilter={() => handleOpenFilter(TokenStatus.FINAL)}
             />
          </div>

          {/* Migrated Column */}
          <div className={`h-full overflow-hidden ${activeMobileTab === TokenStatus.MIGRATED ? 'block' : 'hidden md:block'}`}>
             <Column 
                title={TokenStatus.MIGRATED} 
                tokens={migratedTokens} 
                loading={loading}
                onOpenFilter={() => handleOpenFilter(TokenStatus.MIGRATED)}
             />
          </div>
        </div>
      </main>
    </>
  );
};

export default function App() {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}