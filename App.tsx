import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Column from './components/Column';
import MobileNav from './components/MobileNav';
import { useTokenData, useSortedTokens } from './hooks';
import { TokenStatus } from './types';
import { Sprout, Trophy, Target } from 'lucide-react';

const App = () => {
  const { tokens, loading } = useTokenData();
  const [activeMobileTab, setActiveMobileTab] = useState<TokenStatus>(TokenStatus.NEW);

  const newTokens = useSortedTokens(tokens, TokenStatus.NEW);
  const finalTokens = useSortedTokens(tokens, TokenStatus.FINAL);
  const migratedTokens = useSortedTokens(tokens, TokenStatus.MIGRATED);

  const tabs = [
    { id: TokenStatus.NEW, label: 'New Pairs', icon: <Sprout size={14} className="text-green-400" /> },
    { id: TokenStatus.FINAL, label: 'Final Stretch', icon: <Trophy size={14} className="text-yellow-400" /> },
    { id: TokenStatus.MIGRATED, label: 'Migrated', icon: <Target size={14} className="text-blue-400" /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-background text-textMain overflow-hidden selection:bg-primary/30">
      <Navbar />
      
      {/* Sub-header / Filter Bar */}
      <div className="h-12 border-b border-border bg-surface flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
           <div className="flex items-center gap-2 text-lg font-semibold text-white whitespace-nowrap">
              Pulse <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
           </div>
           <div className="h-6 w-[1px] bg-border mx-2"></div>
           
           {/* Desktop filters visual only */}
           <div className="hidden md:flex gap-2">
              <button className="bg-[#27272a] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#3f3f46] transition">Display ▼</button>
              <button className="text-textMuted hover:text-white transition p-1.5"><Target size={16}/></button>
           </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="flex-1 overflow-hidden relative">
        
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
                icon={<Sprout size={16} className="text-green-500" />}
             />
          </div>

          {/* Final Stretch Column */}
          <div className={`h-full overflow-hidden ${activeMobileTab === TokenStatus.FINAL ? 'block' : 'hidden md:block'}`}>
             <Column 
                title={TokenStatus.FINAL} 
                tokens={finalTokens} 
                loading={loading}
                icon={<Trophy size={16} className="text-yellow-500" />} 
             />
          </div>

          {/* Migrated Column */}
          <div className={`h-full overflow-hidden ${activeMobileTab === TokenStatus.MIGRATED ? 'block' : 'hidden md:block'}`}>
             <Column 
                title={TokenStatus.MIGRATED} 
                tokens={migratedTokens} 
                loading={loading}
                icon={<Target size={16} className="text-blue-500" />} 
             />
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default App;