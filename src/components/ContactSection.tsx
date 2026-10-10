import React, { useState } from 'react';
import { EditableProfileData } from '../data/portfolioData';
import { Github, Mail, Linkedin, Copy, Check, ExternalLink, Send } from 'lucide-react';

interface ContactSectionProps {
  profileData: EditableProfileData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profileData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="w-full py-20 px-4 max-w-6xl mx-auto border-t border-[#252B33]" id="contact">
      <div className="space-y-12">
        {/* Main Closing Headline */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#929BA7]">
            <span className="text-[#B7FF5A] font-semibold">GET IN TOUCH</span>
            <span>·</span>
            <span>DIRECT INQUIRIES & COLLABORATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F5F7] text-balance">
            LET'S BUILD SOMETHING THAT HOLDS UP UNDER SCRUTINY.
          </h2>

          <p className="text-sm sm:text-base text-[#929BA7] leading-relaxed">
            Interested in software supply-chain security, verification workflows, campus systems, or engineering collaborations. Feel free to reach out directly.
          </p>
        </div>

        {/* Contact Links & Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* Email Card with Mailto & Copy */}
          <div className="p-5 border border-[#252B33] bg-[#0E1217] flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#6A7482]">DIRECT EMAIL</span>
              <span className="text-[10px] text-[#B7FF5A]">PRIMARY CHANNEL</span>
            </div>

            <div className="space-y-2">
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#F3F5F7] hover:text-[#B7FF5A] transition-colors truncate"
              >
                <Mail className="w-4 h-4 shrink-0 text-[#B7FF5A]" />
                <span className="truncate">{profileData.email}</span>
                <Send className="w-3.5 h-3.5 text-[#6A7482] shrink-0" />
              </a>
              <p className="text-[11px] text-[#929BA7] font-sans">
                Click to compose an email or use the copy button below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href={`mailto:${profileData.email}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#B7FF5A] hover:bg-[#a6ec49] text-[#090B0E] font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND MAIL</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 border transition-colors cursor-pointer ${
                  copied
                    ? 'border-[#B7FF5A] bg-[#152317] text-[#B7FF5A]'
                    : 'border-[#252B33] bg-[#11151A] text-[#929BA7] hover:text-[#F3F5F7] hover:border-[#353D47]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* GitHub Card */}
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 border border-[#252B33] bg-[#0E1217] hover:border-[#B7FF5A] hover:bg-[#11151A] transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#6A7482]">SOURCE REPOSITORY</span>
              <ExternalLink className="w-4 h-4 text-[#6A7482] group-hover:text-[#B7FF5A] transition-colors" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#F3F5F7] group-hover:text-[#B7FF5A] transition-colors">
                <Github className="w-4 h-4" />
                <span>github.com/{profileData.githubUsername}</span>
              </div>
              <p className="text-[11px] text-[#929BA7] font-sans">
                Review source repositories for ChainProof, OfferGuard, Campus Flow, and Vallam.
              </p>
            </div>

            <span className="text-[10px] text-[#B7FF5A]">OPEN GITHUB REPOSITORY →</span>
          </a>

          {/* LinkedIn Profile Card */}
          <a
            href={profileData.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 border border-[#252B33] bg-[#0E1217] hover:border-[#B7FF5A] hover:bg-[#11151A] transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#6A7482]">PROFESSIONAL NETWORK</span>
              <ExternalLink className="w-4 h-4 text-[#6A7482] group-hover:text-[#B7FF5A] transition-colors" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#F3F5F7] group-hover:text-[#B7FF5A] transition-colors">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </div>
              <p className="text-[11px] text-[#929BA7] font-sans">
                Professional network and academic affiliations [Editable placeholder].
              </p>
            </div>

            <span className="text-[10px] text-[#929BA7] group-hover:text-[#B7FF5A] transition-colors">
              VIEW PROFILE →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
