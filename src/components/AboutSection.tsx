import React from 'react';
import { EditableProfileData } from '../data/portfolioData';
import { GraduationCap, Shield, Code, Cpu, Terminal, Compass } from 'lucide-react';

interface AboutSectionProps {
  profileData: EditableProfileData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profileData }) => {
  return (
    <section className="w-full py-16 px-4 max-w-6xl mx-auto" id="about">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#252B33] pb-4 mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#929BA7] mb-1">
            <span className="text-[#B7FF5A] font-semibold">SECTION 03</span>
            <span>·</span>
            <span>IDENTITY & FOCUS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F5F7]">
            CURIOSITY IS THE STARTING POINT.
          </h2>
        </div>
        <div className="text-xs font-mono text-[#929BA7]">
          <span>ACADEMIC WORKSTATION // BATCH {profileData.graduationBatch}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Authentic Introduction (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 text-base sm:text-lg text-[#D8DEE9] leading-relaxed">
            <p>
              I am an engineering student and developer who enjoys understanding how software systems work under the hood, investigating security problems, building practical applications, and learning through experimentation.
            </p>
            <p className="text-sm sm:text-base text-[#929BA7]">
              Whether dissecting software supply chains, building verification tools, or architecting organized campus workflow systems, I prefer rolling up my sleeves to test assumptions, inspect source code, and create dependable digital tools that hold up under real-world conditions.
            </p>
            <p className="text-sm sm:text-base text-[#929BA7]">
              I believe practical engineering is the most reliable way to learn: writing code, observing where systems fail, measuring behavior, and improving security through continuous practice.
            </p>
          </div>

          {/* Operating Principle Block */}
          <div className="border border-[#252B33] bg-[#0E1217] p-5 font-mono space-y-4">
            <div className="flex items-center justify-between border-b border-[#252B33] pb-2 text-xs text-[#929BA7]">
              <span className="text-[#B7FF5A] font-semibold">ENGINEERING PRINCIPLES</span>
              <span>METHODOLOGY</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#11151A] border border-[#252B33]">
                <span className="text-[#B7FF5A] font-bold block mb-1">BUILD</span>
                <span className="text-[#929BA7] text-[11px] font-sans">
                  Construct functional systems to understand architecture.
                </span>
              </div>
              <div className="p-3 bg-[#11151A] border border-[#252B33]">
                <span className="text-[#B7FF5A] font-bold block mb-1">BREAK</span>
                <span className="text-[#929BA7] text-[11px] font-sans">
                  Analyze failure modes and probe edge-case assumptions.
                </span>
              </div>
              <div className="p-3 bg-[#11151A] border border-[#252B33]">
                <span className="text-[#B7FF5A] font-bold block mb-1">MEASURE</span>
                <span className="text-[#929BA7] text-[11px] font-sans">
                  Observe telemetry, verify signals, and profile behavior.
                </span>
              </div>
              <div className="p-3 bg-[#11151A] border border-[#252B33]">
                <span className="text-[#B7FF5A] font-bold block mb-1">VERIFY</span>
                <span className="text-[#929BA7] text-[11px] font-sans">
                  Ensure integrity, reproducibility, and dependable outcomes.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Background & Interests (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Education Box */}
          <div className="border border-[#252B33] bg-[#0B0E12] p-5 space-y-4 font-mono">
            <div className="flex items-center gap-2 text-xs text-[#929BA7] border-b border-[#252B33] pb-2">
              <GraduationCap className="w-4 h-4 text-[#B7FF5A]" />
              <span className="text-[#F3F5F7] font-semibold">EDUCATION & CREDENTIALS</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-[#6A7482] uppercase tracking-wider block">DISCIPLINE</span>
                <span className="text-sm font-semibold text-[#F3F5F7] block">
                  {profileData.education}
                </span>
                <span className="text-xs text-[#929BA7] font-sans block pt-0.5">
                  {profileData.institution}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#1D232B]">
                <span className="text-[#929BA7]">Graduation Batch:</span>
                <span className="text-[#B7FF5A] font-bold tabular-nums">{profileData.graduationBatch}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#1D232B]">
                <span className="text-[#929BA7]">Academic CGPA:</span>
                <span className="text-[#F3F5F7] font-bold tabular-nums">{profileData.cgpa}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#1D232B]">
                <span className="text-[#929BA7]">Developer Handle:</span>
                <span className="text-[#F3F5F7] font-bold">{profileData.githubUsername}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#1D232B]">
                <span className="text-[#929BA7]">LinkedIn:</span>
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B7FF5A] font-bold hover:underline"
                >
                  harikumar-elango
                </a>
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="border border-[#252B33] bg-[#0B0E12] p-5 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-xs text-[#929BA7] border-b border-[#252B33] pb-2">
              <Compass className="w-4 h-4 text-[#B7FF5A]" />
              <span className="text-[#F3F5F7] font-semibold">CORE DOMAINS & INTERESTS</span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {profileData.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-2.5 py-1 bg-[#11151A] text-[#F3F5F7] border border-[#252B33]"
                >
                  {interest}
                </span>
              ))}
            </div>

            <p className="text-[11px] text-[#929BA7] font-sans pt-1 leading-relaxed">
              Actively exploring where cybersecurity intersects with intelligent software architectures and resilient backend systems.
            </p>
          </div>

          {/* Academic Ethos Box */}
          <div className="p-4 bg-[#11151A] border border-[#252B33] text-xs font-mono text-[#929BA7] space-y-1.5">
            <span className="text-[#F3F5F7] font-semibold block flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#B7FF5A]" />
              <span>AUTHENTICITY INVARIANT</span>
            </span>
            <p className="font-sans leading-relaxed text-[#929BA7]">
              No fabricated certifications, awards, or inflated metrics. Every project listed here represents actual source code maintained on GitHub.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
