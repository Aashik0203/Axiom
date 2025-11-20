import React from 'react';
import { Flame, Compass, BarChart2, Activity, User } from 'lucide-react';

const MobileNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111] border-t border-border h-16 grid grid-cols-5 items-center pb-safe">
       <button className="flex flex-col items-center justify-center gap-1 text-textMuted hover:text-primary">
          <Flame size={20} />
          <span className="text-[10px]">Trending</span>
       </button>
       <button className="flex flex-col items-center justify-center gap-1 text-textMuted hover:text-primary">
          <Compass size={20} />
          <span className="text-[10px]">Track</span>
       </button>
       <button className="flex flex-col items-center justify-center gap-1 text-white relative">
          <div className="absolute -top-8 bg-primary rounded-full p-3 border-4 border-[#050505] shadow-lg shadow-primary/40">
            <Activity size={24} className="text-white" />
          </div>
          <span className="text-[10px] mt-6 font-medium">Pulse</span>
       </button>
       <button className="flex flex-col items-center justify-center gap-1 text-textMuted hover:text-primary">
          <BarChart2 size={20} />
          <span className="text-[10px]">Perps</span>
       </button>
       <button className="flex flex-col items-center justify-center gap-1 text-textMuted hover:text-primary">
          <User size={20} />
          <span className="text-[10px]">Account</span>
       </button>
    </div>
  );
};

export default MobileNav;