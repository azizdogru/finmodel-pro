import React from 'react';

interface RelatedTool {
  name: string;
  url: string;
  badge: string;
  desc: string;
}

const RELATED_TOOLS: RelatedTool[] = [{'name': 'OpsManual Pro', 'url': 'https://opsmanual-pro.vercel.app', 'badge': 'Standard Procedures', 'desc': 'Standardize daily workflows, hygiene, and employee onboarding.'}, {'name': 'LLC Operating Agreement', 'url': 'https://llc-operating-agreement.vercel.app', 'badge': 'Corporate Entity', 'desc': 'Formalize member shares, voting rights, and bank account setups.'}, {'name': 'Contractor NDA', 'url': 'https://contractor-nda.vercel.app', 'badge': 'IP Protection', 'desc': 'Non-disclosure agreement for 1099 contractors and freelancers.'}, {'name': 'Promissory Note', 'url': 'https://promissory-note.vercel.app', 'badge': 'Debt & Financing', 'desc': 'Legally binding debt agreement for business loans and startup capital.'}];

export function SisterTools() {
  return (
    <div className="pt-8 pb-4 border-t border-slate-800 text-xs">
      <div className="flex items-center justify-between mb-3">
        <p className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
          Related Enterprise & Startup Operations
        </p>
        <span className="text-[10px] text-slate-500 font-medium">Verified Partner Tools</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {RELATED_TOOLS.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener"
            className="p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition group block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-200 group-hover:text-blue-400 transition text-xs">
                {tool.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400 border border-slate-600/40">
                {tool.badge}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
              {tool.desc}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
