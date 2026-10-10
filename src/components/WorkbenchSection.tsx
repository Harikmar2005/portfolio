import React, { useState } from 'react';
import { workbenchSkills } from '../data/portfolioData';
import { Wrench, Code, Shield, Cpu, Terminal, Database, Check } from 'lucide-react';

export const WorkbenchSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSkillName, setActiveSkillName] = useState<string>('Python');

  const categories = ['All', ...workbenchSkills.map((c) => c.category)];

  const allItems = workbenchSkills.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  const filteredItems =
    activeCategory === 'All'
      ? allItems
      : allItems.filter((i) => i.category === activeCategory);

  const selectedSkill = allItems.find((i) => i.name === activeSkillName) || allItems[0];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Programming Languages':
        return <Code className="w-3.5 h-3.5 text-[#B7FF5A]" />;
      case 'Cybersecurity Tools':
        return <Shield className="w-3.5 h-3.5 text-[#B7FF5A]" />;
      case 'Backend Development':
        return <Cpu className="w-3.5 h-3.5 text-[#B7FF5A]" />;
      case 'Machine Learning':
        return <Wrench className="w-3.5 h-3.5 text-[#B7FF5A]" />;
      case 'Databases & Developer Tools':
        return <Database className="w-3.5 h-3.5 text-[#B7FF5A]" />;
      default:
        return <Terminal className="w-3.5 h-3.5 text-[#B7FF5A]" />;
    }
  };

  return (
    <section className="w-full py-16 px-4 max-w-6xl mx-auto" id="skills">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#252B33] pb-4 mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#929BA7] mb-1">
            <span className="text-[#B7FF5A] font-semibold">SECTION 04</span>
            <span>·</span>
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F5F7]">
            TOOLS IN THE WORKBENCH
          </h2>
        </div>
        <p className="text-xs font-mono text-[#929BA7] max-w-sm">
          Categorized technical skills and tools confirmed through practical projects and experimentation.
        </p>
      </div>

      {/* Category Tabs (Interactive Filter Buttons) */}
      <div className="flex flex-wrap items-center gap-1.5 mb-8 p-1 bg-[#11151A] border border-[#252B33]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#1C232D] text-[#B7FF5A] font-semibold border border-[#353D47]'
                : 'text-[#929BA7] hover:text-[#F3F5F7] border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Workbench Matrix + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Matrix: Tools Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredItems.map((item) => {
            const isSelected = item.name === activeSkillName;

            return (
              <div
                key={item.name}
                onClick={() => setActiveSkillName(item.name)}
                className={`p-3.5 border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#B7FF5A] bg-[#121915]'
                    : 'border-[#252B33] bg-[#0E1217] hover:border-[#353D47] hover:bg-[#11151A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-[#6A7482] uppercase tracking-wider truncate">
                    {item.category}
                  </span>
                  {isSelected && (
                    <span className="inline-block w-1.5 h-1.5 bg-[#B7FF5A] rounded-full shrink-0" />
                  )}
                </div>

                <div className="text-sm font-semibold text-[#F3F5F7] mb-1 font-mono">
                  {item.name}
                </div>

                <p className="text-xs text-[#929BA7] line-clamp-2 leading-relaxed font-sans">
                  {item.context}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-4 border border-[#252B33] bg-[#0E1217] p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-[#252B33] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#929BA7] mb-1">
                {getCategoryIcon(selectedSkill.category)}
                <span>{selectedSkill.category}</span>
              </div>
              <h3 className="text-xl font-bold text-[#F3F5F7] font-mono">
                {selectedSkill.name}
              </h3>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#6A7482] uppercase tracking-wider block">
                Workstation Application:
              </span>
              <p className="text-xs sm:text-sm text-[#D8DEE9] leading-relaxed font-sans">
                {selectedSkill.context}
              </p>
            </div>

            <div className="p-3 bg-[#11151A] border border-[#252B33] text-xs font-mono text-[#929BA7] space-y-1">
              <div className="text-[#B7FF5A] font-semibold text-[11px]">VERIFIED CAPABILITY</div>
              <p className="text-[11px] font-sans text-[#929BA7]">
                Used across active repositories and academic cybersecurity lab exercises.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#252B33] text-[11px] font-mono text-[#6A7482]">
            CONFIG: src/data/portfolioData.ts
          </div>
        </div>
      </div>
    </section>
  );
};
