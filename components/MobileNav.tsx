import React from 'react';
import { Flame, Compass, BarChart2, Activity, User } from 'lucide-react';

const MobileNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#050505] border-t border-border h-[60px] grid grid-cols-5 items-end pb-2 z-50">
       <button className="flex flex-col items-center justify-center gap-1.5 text-textMuted hover:text-primary h-full">
          <Flame size={20} />
          <span className="text-[10px] font-medium">Trending</span>
       </button>
       <button className="flex flex-col items-center justify-center gap-1.5 text-textMuted hover:text-primary h-full">
          <Compass size={20} />
          <span className="text-[10px] font-medium">Track</span>
       </button>
       <button className="flex flex-col items-center justify-center gap-1.5 text-[#3b82f6] h-full relative">
           <div className="absolute top-0 w-full h-[1px] bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <Activity size={20} className="stroke-[2.5px]" />
          <span className="text-[10px] font-bold">Pulse</span>
       </button>
       <button className="flex flex-col items-center justify-center gap-1.5 text-textMuted hover:text-primary h-full">
          <BarChart2 size={20} />
          <span className="text-[10px] font-medium">Perpetuals</span>
       </button>
       <button className="flex flex-col items-center justify-center gap-1.5 text-textMuted hover:text-primary h-full">
          <User size={20} />
          <span className="text-[10px] font-medium">Account</span>
       </button>
    </div>
  );
};

export default MobileNav;