import React from 'react';
import { ShieldCheck, FileSpreadsheet, Lock, Star } from 'lucide-react';

export function TrustBar() {
  return (
    <div className="border-y border-slate-800/80 bg-slate-950/60 py-6 my-10 text-xs text-slate-300 rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Audit-Ready Financial Models</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Dynamic 3-statement models built to institutional VC and private equity standards.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Universal Excel & Google Sheets</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Fully unlocked formulas (.xlsx) with zero circular errors, macros, or hidden cells.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Instant Unlocked Download</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Immediate delivery right after checkout with lifetime updates and documentation.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Trusted by Founders & CFOs</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Used by pre-seed to Series B startups, boutique CFOs, and venture studios.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
