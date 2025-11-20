import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, RotateCcw, Hand, Zap } from 'lucide-react';
import { FilterState, TokenStatus } from '../types';
import { PROTOCOLS, QUOTE_TOKENS } from '../constants';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TokenStatus;
  onTabChange: (tab: TokenStatus) => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
}

const BadgeToggle = ({ 
  label, 
  active, 
  onClick, 
  colorClass, 
  icon 
}: { 
  label: string, 
  active: boolean, 
  onClick: () => void, 
  colorClass: string,
  icon?: React.ReactNode
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium transition-all
      ${active 
        ? colorClass 
        : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700'
      }`}
  >
    {icon}
    {label}
  </button>
);

const InputGroup = ({ 
  label, 
  min, 
  max, 
  onMinChange, 
  onMaxChange,
  suffix
}: { 
  label: string, 
  min: string, 
  max: string, 
  onMinChange: (val: string) => void, 
  onMaxChange: (val: string) => void,
  suffix?: string
}) => (
  <div className="space-y-1.5">
    <label className="text-[11px] text-zinc-500 font-medium">{label}</label>
    <div className="flex gap-2">
      <div className="relative flex-1">
         <input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => onMinChange(e.target.value)}
            className="w-full bg-[#111] border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600"
         />
      </div>
      <div className="relative flex-1">
         <input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => onMaxChange(e.target.value)}
            className="w-full bg-[#111] border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600"
         />
         {suffix && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500">{suffix}</span>
         )}
      </div>
    </div>
  </div>
);

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, activeTab, onTabChange, filters, onApply }) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [subTab, setSubTab] = useState<'Audit' | 'Metrics' | 'Socials'>('Audit');

  // Sync props to local state when opening or tab changing
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  const toggleProtocol = (p: string) => {
    setLocalFilters(prev => ({
      ...prev,
      protocols: prev.protocols.includes(p) 
        ? prev.protocols.filter(i => i !== p)
        : [...prev.protocols, p]
    }));
  };

  const toggleQuote = (q: string) => {
    setLocalFilters(prev => ({
      ...prev,
      quoteTokens: prev.quoteTokens.includes(q)
        ? prev.quoteTokens.filter(i => i !== q)
        : [...prev.quoteTokens, q]
    }));
  };

  const getProtocolStyle = (p: string) => {
    if (p.includes('Four')) return 'bg-green-500/10 border-green-500/30 text-green-400';
    if (p.includes('X Mode')) return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
  };

  const getQuoteStyle = (q: string) => {
    if (['WBNB', 'BNB', 'USD1'].includes(q)) return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    if (['USDT', 'CAKE'].includes(q)) return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
    return 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400';
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
      <div className="bg-[#09090b] w-[480px] rounded-xl border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <h2 className="text-sm font-bold text-white">Filters</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Column Tabs */}
        <div className="flex items-center border-b border-zinc-800 bg-[#0c0c0e] px-2">
          {[TokenStatus.NEW, TokenStatus.FINAL, TokenStatus.MIGRATED].map(tab => (
             <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors
                   ${activeTab === tab ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}
                `}
             >
                {tab}
             </button>
          ))}
          <button className="p-2 text-zinc-500 hover:text-white ml-2">
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
            
            {/* Protocols */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-500">Protocols</span>
                    <button onClick={() => setLocalFilters(prev => ({...prev, protocols: []}))} className="text-[10px] text-zinc-500 hover:text-white bg-zinc-900 px-2 py-0.5 rounded">Unselect All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {PROTOCOLS.map(p => (
                        <BadgeToggle 
                            key={p}
                            label={p}
                            active={localFilters.protocols.includes(p)}
                            onClick={() => toggleProtocol(p)}
                            colorClass={getProtocolStyle(p)}
                            icon={p.includes('Four') ? <Hand size={10} className="fill-current" /> : <Zap size={10} className="fill-current" />}
                        />
                    ))}
                </div>
            </div>

            {/* Quote Tokens */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-500">Quote Tokens</span>
                    <button onClick={() => setLocalFilters(prev => ({...prev, quoteTokens: []}))} className="text-[10px] text-zinc-500 hover:text-white bg-zinc-900 px-2 py-0.5 rounded">Unselect All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {QUOTE_TOKENS.map(q => (
                        <BadgeToggle 
                            key={q}
                            label={q}
                            active={localFilters.quoteTokens.includes(q)}
                            onClick={() => toggleQuote(q)}
                            colorClass={getQuoteStyle(q)}
                            icon={<div className="w-3 h-3 rounded-full bg-current opacity-20"></div>}
                        />
                    ))}
                </div>
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-500">Search Keywords</label>
                    <input 
                        type="text" 
                        placeholder="keyword1, keyword2..."
                        value={localFilters.search}
                        onChange={(e) => setLocalFilters(p => ({...p, search: e.target.value}))}
                        className="w-full bg-[#111] border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-600 placeholder:text-zinc-700"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-500">Exclude Keywords</label>
                    <input 
                        type="text" 
                        placeholder="keyword1, keyword2..."
                        value={localFilters.exclude}
                        onChange={(e) => setLocalFilters(p => ({...p, exclude: e.target.value}))}
                        className="w-full bg-[#111] border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-600 placeholder:text-zinc-700"
                    />
                </div>
            </div>

            {/* Sub Tabs & Dex Paid */}
            <div className="space-y-3">
                <div className="flex items-center gap-4 border-b border-zinc-800/50 pb-1">
                    {['Audit', '$ Metrics', 'Socials'].map(t => (
                        <button 
                            key={t}
                            onClick={() => setSubTab(t as any)}
                            className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${subTab === t ? 'bg-[#1a1a1a] text-white border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${localFilters.dexPaid ? 'bg-blue-600 border-blue-600' : 'border-zinc-700 bg-[#111]'}`}>
                        {localFilters.dexPaid && <div className="w-2 h-2 bg-white rounded-[1px]"></div>}
                    </div>
                    <input type="checkbox" className="hidden" checked={localFilters.dexPaid} onChange={(e) => setLocalFilters(p => ({...p, dexPaid: e.target.checked}))} />
                    <span className="text-xs font-medium text-white group-hover:text-zinc-200">Dex Paid</span>
                </label>
            </div>

            {/* Metric Inputs */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <InputGroup 
                    label="Age" 
                    min={localFilters.minAge} max={localFilters.maxAge}
                    onMinChange={(v) => setLocalFilters(p => ({...p, minAge: v}))}
                    onMaxChange={(v) => setLocalFilters(p => ({...p, maxAge: v}))}
                    suffix="m"
                />
                 <InputGroup 
                    label="Top 10 Holders %" 
                    min={localFilters.minTop10} max={localFilters.maxTop10}
                    onMinChange={(v) => setLocalFilters(p => ({...p, minTop10: v}))}
                    onMaxChange={(v) => setLocalFilters(p => ({...p, maxTop10: v}))}
                />
                 <InputGroup 
                    label="Dev Holding %" 
                    min={localFilters.minDevHolding} max={localFilters.maxDevHolding}
                    onMinChange={(v) => setLocalFilters(p => ({...p, minDevHolding: v}))}
                    onMaxChange={(v) => setLocalFilters(p => ({...p, maxDevHolding: v}))}
                />
                 <InputGroup 
                    label="Snipers %" 
                    min={localFilters.minSnipers} max={localFilters.maxSnipers}
                    onMinChange={(v) => setLocalFilters(p => ({...p, minSnipers: v}))}
                    onMaxChange={(v) => setLocalFilters(p => ({...p, maxSnipers: v}))}
                />
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 flex items-center justify-between bg-[#0c0c0e]">
             <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full bg-[#1a1a1a] border border-zinc-800 text-xs text-zinc-300 font-bold hover:bg-[#222] hover:text-white transition-colors">Import</button>
                <button className="px-4 py-1.5 rounded-full bg-[#1a1a1a] border border-zinc-800 text-xs text-zinc-300 font-bold hover:bg-[#222] hover:text-white transition-colors">Export</button>
             </div>
             <button 
                onClick={() => onApply(localFilters)}
                className="px-6 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all"
             >
                Apply All
             </button>
        </div>

      </div>
    </div>,
    portalRoot
  );
};

export default FilterModal;