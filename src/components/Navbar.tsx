import React, { useState } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#252B33] bg-[#090B0E]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="text-base sm:text-lg font-bold font-mono tracking-tight text-[#F3F5F7] hover:text-[#B7FF5A] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>HK / LAB</span>
          <span className="hidden sm:inline-block text-[10px] text-[#6A7482] font-normal">
            [CYBERSECURITY LAB]
          </span>
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-[#929BA7]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#B7FF5A] transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <a
            href="https://www.linkedin.com/in/harikumar-elango-a32072320"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#F3F5F7] hover:text-[#B7FF5A] bg-[#11151A] hover:bg-[#151A21] border border-[#252B33] hover:border-[#B7FF5A] transition-colors whitespace-nowrap shrink-0"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#B7FF5A]" />
            <span>LINKEDIN</span>
          </a>

          <a
            href="https://github.com/Harikmar2005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-[#090B0E] bg-[#B7FF5A] hover:bg-[#a6ec49] font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <Github className="w-3.5 h-3.5" />
            <span>VIEW GITHUB</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="https://www.linkedin.com/in/harikumar-elango-a32072320"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#B7FF5A] border border-[#252B33]"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/Harikmar2005"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#B7FF5A] border border-[#252B33]"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#929BA7] hover:text-[#F3F5F7] border border-[#252B33] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#252B33] bg-[#0B0E12] px-4 py-4 space-y-3 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#929BA7] hover:text-[#B7FF5A]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#252B33] space-y-2">
            <a
              href="https://www.linkedin.com/in/harikumar-elango-a32072320"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[#F3F5F7] bg-[#11151A] border border-[#252B33] font-semibold hover:border-[#B7FF5A]"
            >
              <Linkedin className="w-4 h-4 text-[#B7FF5A]" />
              <span>VIEW LINKEDIN</span>
            </a>
            <a
              href="https://github.com/Harikmar2005"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[#090B0E] bg-[#B7FF5A] font-semibold"
            >
              <Github className="w-4 h-4" />
              <span>VIEW GITHUB PROFILE</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
