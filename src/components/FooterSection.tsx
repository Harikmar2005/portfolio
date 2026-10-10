import React, { useState, useEffect } from 'react';
import { Shield, ArrowUp, ExternalLink } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#252B33] bg-[#07090C] py-8 px-4 font-mono text-xs text-[#929BA7]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Status */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[#F3F5F7] font-bold">HK / LAB</span>
          <span className="text-[#6A7482]">·</span>
          <span className="text-[#B7FF5A] flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B7FF5A]" />
            SYSTEM ONLINE
          </span>
          <span className="text-[#6A7482]">·</span>
          <span className="text-[#6A7482] tabular-nums">{utcTime}</span>
        </div>

        {/* Links & Top CTA */}
        <div className="flex items-center gap-6">
          <a
            href="https://portfolio-lake-seven-97.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F3F5F7] transition-colors flex items-center gap-1 text-[11px]"
          >
            <span>REFERENCE PORTFOLIO</span>
            <ExternalLink className="w-3 h-3 text-[#6A7482]" />
          </a>

          <a
            href="https://github.com/Harikmar2005"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B7FF5A] transition-colors"
          >
            GITHUB
          </a>

          <a
            href="#resume"
            className="hover:text-[#B7FF5A] transition-colors"
          >
            RESUME
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-[#B7FF5A] transition-colors cursor-pointer text-[11px]"
            title="Scroll to top of workstation"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
