import React, { useState } from 'react';
import { Box, Code2, Terminal, Edit3, Check, Cpu } from 'lucide-react';

export const VallamVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'parameters'>('architecture');

  const modules = [
    { id: 'MOD-01', name: 'Core Engine / Entrypoint', status: 'Placeholder', note: 'Awaiting repository source inspection' },
    { id: 'MOD-02', name: 'Utility Pipeline & Automation', status: 'Placeholder', note: 'Modular routines and event handlers' },
    { id: 'MOD-03', name: 'Configuration & Environment', status: 'Placeholder', note: 'Runtime arguments and system bindings' },
    { id: 'MOD-04', name: 'Output Formatting & Dispatch', status: 'Placeholder', note: 'Formatted response and log structures' },
  ];

  return (
    <div className="w-full border border-[#252B33] bg-[#0B0E12] p-4 flex flex-col gap-3 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#252B33] pb-2 text-xs text-[#929BA7]">
        <div className="flex items-center gap-2">
          <Box className="w-3.5 h-3.5 text-[#B7FF5A]" />
          <span className="text-[#F3F5F7] font-semibold">VALLAM // SYSTEM_INSPECTOR</span>
          <span>·</span>
          <span className="text-[#B7FF5A]">MODULAR FRAMEWORK</span>
        </div>
        <span className="text-[10px] text-amber-400 bg-[#241D12] px-1.5 py-0.5 border border-amber-900">
          EDITABLE PLACEHOLDER
        </span>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] text-[#6A7482]">INSPECTION VIEW:</span>
        <div className="flex items-center gap-1 bg-[#11151A] p-0.5 border border-[#252B33]">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-2 py-0.5 text-[10px] transition-colors ${
              activeTab === 'architecture'
                ? 'bg-[#1C232D] text-[#B7FF5A] font-semibold'
                : 'text-[#6A7482] hover:text-[#929BA7]'
            }`}
          >
            ARCHITECTURE MATRIX
          </button>
          <button
            onClick={() => setActiveTab('parameters')}
            className={`px-2 py-0.5 text-[10px] transition-colors ${
              activeTab === 'parameters'
                ? 'bg-[#1C232D] text-[#B7FF5A] font-semibold'
                : 'text-[#6A7482] hover:text-[#929BA7]'
            }`}
          >
            METADATA SLOTS
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      {activeTab === 'architecture' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-[#1D232B] bg-[#0E1217] p-3 max-h-[190px] overflow-y-auto">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="p-2.5 bg-[#11151A] border border-[#252B33] text-xs space-y-1 hover:border-[#353D47] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6A7482]">{mod.id}</span>
                <span className="text-[9px] text-[#929BA7] border border-[#252B33] px-1 bg-[#151A21]">
                  {mod.status}
                </span>
              </div>
              <div className="text-[#F3F5F7] font-semibold truncate text-[11px]">
                {mod.name}
              </div>
              <p className="text-[10px] text-[#929BA7] font-sans truncate">
                {mod.note}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 border border-[#1D232B] bg-[#0E1217] p-3 text-xs max-h-[190px] overflow-y-auto">
          <div className="p-2 bg-[#11151A] border border-[#252B33] flex items-center justify-between">
            <span className="text-[#6A7482]">REPOSITORY TARGET:</span>
            <span className="text-[#B7FF5A]">github.com/Harikmar2005/valam</span>
          </div>
          <div className="p-2 bg-[#11151A] border border-[#252B33] flex items-center justify-between">
            <span className="text-[#6A7482]">PROJECT SLUG:</span>
            <span className="text-[#F3F5F7]">Vallam (valam)</span>
          </div>
          <div className="p-2 bg-[#11151A] border border-[#252B33] flex items-center justify-between">
            <span className="text-[#6A7482]">VERIFICATION STATUS:</span>
            <span className="text-amber-400">Awaiting source code audit</span>
          </div>
        </div>
      )}

      {/* Editable Indicator Footer */}
      <div className="border border-[#252B33] bg-[#11151A] p-2.5 text-xs">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#F3F5F7] flex items-center gap-1.5">
            <Edit3 className="w-3 h-3 text-[#B7FF5A]" />
            <span>CUSTOM VISUAL TEMPLATE</span>
          </span>
          <span className="text-[#6A7482] text-[10px]">
            READY FOR LIVE REPO METRICS
          </span>
        </div>
      </div>
    </div>
  );
};
