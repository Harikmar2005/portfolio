import React from 'react';
import { EditableProfileData } from '../data/portfolioData';
import { NetworkRadarHero } from './NetworkRadarHero';
import { ArrowDown, Github, ChevronRight, FileText, Linkedin } from 'lucide-react';

interface HeroSectionProps {
  profileData: EditableProfileData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profileData }) => {
  return (
    <section className="relative w-full pt-12 pb-16 px-4 max-w-6xl mx-auto" id="home">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-lab-grid opacity-30 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Typographic Hierarchy (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Classification & Status Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
            {/* Classification label */}
            <span className="text-[#F3F5F7] bg-[#11151A] px-2.5 py-1 border border-[#252B33]">
              CYBERSECURITY RESEARCH LAB
            </span>

            {/* Live status indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#111812] border border-[#2A472E] text-[#B7FF5A]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#B7FF5A] animate-pulse" />
              <span className="font-semibold text-[11px]">SYSTEM ONLINE</span>
            </div>

            <span className="text-[#6A7482] hidden sm:inline">·</span>
            <span className="text-[#929BA7] hidden sm:inline text-[11px] font-mono">
              BATCH {profileData.graduationBatch}
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#F3F5F7] leading-[1.1] text-balance">
              {profileData.headline}
            </h1>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#929BA7] max-w-xl leading-relaxed font-sans">
            {profileData.supportingText}
          </p>

          {/* Buttons: EXPLORE PROJECTS, VIEW GITHUB, and compact RESUME CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 text-[#090B0E] bg-[#B7FF5A] hover:bg-[#a6ec49] font-bold transition-all shadow-lg shadow-[#B7FF5A]/10 cursor-pointer"
            >
              <span>EXPLORE PROJECTS</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 text-[#F3F5F7] hover:text-[#B7FF5A] bg-[#11151A] hover:bg-[#151A21] border border-[#252B33] hover:border-[#B7FF5A] transition-all"
            >
              <Github className="w-4 h-4" />
              <span>VIEW GITHUB</span>
            </a>

            <a
              href="#resume"
              className="inline-flex items-center gap-2 px-4 py-3 text-[#F3F5F7] hover:text-[#B7FF5A] bg-[#11151A] hover:bg-[#151A21] border border-[#252B33] hover:border-[#B7FF5A] transition-all"
            >
              <FileText className="w-4 h-4 text-[#B7FF5A]" />
              <span>RESUME / CV</span>
            </a>

            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 text-[#F3F5F7] hover:text-[#B7FF5A] bg-[#11151A] hover:bg-[#151A21] border border-[#252B33] hover:border-[#B7FF5A] transition-all"
            >
              <Linkedin className="w-4 h-4 text-[#B7FF5A]" />
              <span>LINKEDIN</span>
            </a>
          </div>

          {/* Engineering Metas / Fast Facts */}
          <div className="pt-4 border-t border-[#1D232B] grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs text-[#929BA7]">
            <div>
              <span className="block text-[#6A7482] text-[10px]">DISCIPLINE</span>
              <span className="text-[#F3F5F7]">CSE (Cybersecurity)</span>
            </div>
            <div>
              <span className="block text-[#6A7482] text-[10px]">VERIFIED PROJECTS</span>
              <span className="text-[#B7FF5A]">4 Active Repositories</span>
            </div>
            <div>
              <span className="block text-[#6A7482] text-[10px]">APPROACH</span>
              <span className="text-[#F3F5F7]">Experimentation & Practice</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Network Radar Visualization (5 cols) */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <NetworkRadarHero />
        </div>
      </div>

      {/* Small Scroll Indicator */}
      <div className="pt-12 flex items-center justify-between text-xs font-mono text-[#6A7482] border-b border-[#1D232B] pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[#B7FF5A]">01</span>
          <span>// RESEARCH WORKSTATION</span>
        </div>
        <a
          href="#threat-surface"
          className="flex items-center gap-1 hover:text-[#B7FF5A] transition-colors"
        >
          <span>SCROLL TO THREAT SURFACE GRAPH</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
