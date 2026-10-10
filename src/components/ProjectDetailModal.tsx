import React, { useEffect } from 'react';
import { ProjectData } from '../data/portfolioData';
import { X, ExternalLink, Github, Terminal } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0B0E12] border border-[#252B33] text-[#F3F5F7] shadow-2xl p-6 sm:p-8 space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top bar */}
        <div className="flex items-start justify-between border-b border-[#252B33] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#929BA7]">
              <span>PROJECT {project.number}</span>
              <span>·</span>
              <span className="text-[#B7FF5A]">{project.category}</span>
              {project.isEditable && (
                <>
                  <span>·</span>
                  <span className="text-amber-400">EDITABLE PLACEHOLDER</span>
                </>
              )}
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F5F7]">
              {project.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#929BA7] hover:text-[#F3F5F7] hover:bg-[#1A2028] border border-[#252B33] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview description */}
        <p className="text-sm sm:text-base text-[#D8DEE9] leading-relaxed">
          {project.description}
        </p>

        {/* Verified Tech Tags (rendered as clean typographic items) */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-[#6A7482] uppercase tracking-wider block">
            Confirmed Technologies & Focus:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#929BA7]">
            {project.verifiedTags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="text-[#F3F5F7] bg-[#11151A] px-2 py-0.5 border border-[#252B33]">
                  {tag}
                </span>
                {idx < project.verifiedTags.length - 1 && <span className="text-[#6A7482]">/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Technical Deep Dive Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#252B33] pt-4 font-mono text-xs">
          <div className="space-y-2 bg-[#0E1217] p-4 border border-[#1E242D]">
            <span className="text-[#B7FF5A] font-semibold text-xs flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              PROBLEM & MOTIVATION
            </span>
            <p className="text-[#929BA7] leading-relaxed font-sans text-xs sm:text-sm">
              {project.detailedAnalysis.problemStatement}
            </p>
          </div>

          <div className="space-y-2 bg-[#0E1217] p-4 border border-[#1E242D]">
            <span className="text-[#B7FF5A] font-semibold text-xs flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              IMPLEMENTATION & METHODOLOGY
            </span>
            <p className="text-[#929BA7] leading-relaxed font-sans text-xs sm:text-sm">
              {project.detailedAnalysis.methodology}
            </p>
          </div>
        </div>

        {/* Key Architecture Components */}
        <div className="space-y-2 font-mono text-xs">
          <span className="text-[#6A7482] uppercase tracking-wider block">Key System Components:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.detailedAnalysis.keyComponents.map((comp, idx) => (
              <div key={idx} className="p-2.5 bg-[#11151A] border border-[#252B33] text-[#D8DEE9] flex items-start gap-2">
                <span className="text-[#B7FF5A] font-bold">0{idx + 1}.</span>
                <span className="font-sans text-xs">{comp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Considerations */}
        <div className="space-y-2 font-mono text-xs">
          <span className="text-[#6A7482] uppercase tracking-wider block">Technical Considerations & Constraints:</span>
          <div className="space-y-1">
            {project.detailedAnalysis.technicalConsiderations.map((item, idx) => (
              <div key={idx} className="p-2 bg-[#0E1217] border border-[#1E242D] text-[#929BA7] flex items-start gap-2 text-xs font-sans">
                <span className="text-[#6A7482] font-mono">›</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Note */}
        <div className="p-3 bg-[#11151A] border border-[#252B33] text-xs font-mono text-[#929BA7] flex items-start gap-2">
          <div className="w-2 h-2 rounded-full bg-[#B7FF5A] mt-1 shrink-0" />
          <div>
            <span className="text-[#F3F5F7] font-semibold block">STATUS NOTE</span>
            <span className="font-sans text-xs">{project.detailedAnalysis.statusNote}</span>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#252B33]">
          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-[#090B0E] bg-[#B7FF5A] hover:bg-[#a6ec49] font-semibold transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>VIEW REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.isEditable && (
              <span className="text-[11px] font-mono text-[#6A7482] italic">
                * Repository: github.com/Harikmar2005/valam
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#929BA7] hover:text-[#F3F5F7] border border-[#252B33] hover:border-[#353D47] transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
