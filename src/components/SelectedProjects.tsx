import React, { useState } from 'react';
import { ProjectData, projectsData } from '../data/portfolioData';
import { ChainProofGraph } from './ChainProofGraph';
import { OfferGuardInspector } from './OfferGuardInspector';
import { CampusFlowVisual } from './CampusFlowVisual';
import { VallamVisual } from './VallamVisual';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

export const SelectedProjects: React.FC = () => {
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectData | null>(null);

  const renderProjectVisual = (projectId: string) => {
    switch (projectId) {
      case 'chainproof':
        return <ChainProofGraph />;
      case 'offer-guard':
        return <OfferGuardInspector />;
      case 'campus-flow':
        return <CampusFlowVisual />;
      case 'vallam':
        return <VallamVisual />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full py-16 px-4 max-w-6xl mx-auto" id="projects">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#252B33] pb-4 mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#929BA7] mb-1">
            <span className="text-[#B7FF5A] font-semibold">SECTION 02</span>
            <span>·</span>
            <span>SYSTEM AUDIT & PRACTICAL IMPLEMENTATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F5F7]">
            SELECTED PROJECTS
          </h2>
        </div>
        <p className="text-xs font-mono text-[#929BA7] max-w-sm">
          Four practical engineering projects exploring supply-chain trust, offer verification, and workflow management.
        </p>
      </div>

      {/* Projects List in Editorial Flow */}
      <div className="space-y-16">
        {projectsData.map((project) => {
          return (
            <article
              key={project.id}
              className="border border-[#252B33] bg-[#090B0E] transition-colors hover:border-[#353D47]"
            >
              {/* Project Card Header Strip */}
              <div className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-[#252B33] bg-[#11151A] text-xs font-mono text-[#929BA7] gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[#B7FF5A] font-bold text-sm">{project.number}.</span>
                  <span className="text-[#F3F5F7] font-semibold text-sm">{project.name}</span>
                  <span className="text-[#6A7482]">/</span>
                  <span className="text-[#929BA7]">{project.category}</span>
                </div>

                <div className="flex items-center gap-3">
                  {project.isEditable && (
                    <span className="text-[11px] text-amber-400">
                      EDITABLE PLACEHOLDERS
                    </span>
                  )}
                </div>
              </div>

              {/* Main Content Grid: Info on left, Visual on right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Information Column (5 cols) */}
                <div className="lg:col-span-5 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#252B33] space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base text-[#D8DEE9] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Verified Technology Tags (Clean unboxed text with separators) */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-mono text-[#6A7482] uppercase tracking-wider block">
                        Verified Technologies:
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#929BA7]">
                        {project.verifiedTags.map((tag, idx) => (
                          <React.Fragment key={tag}>
                            <span className="text-[#F3F5F7] bg-[#11151A] px-2 py-0.5 border border-[#252B33]">
                              {tag}
                            </span>
                            {idx < project.verifiedTags.length - 1 && (
                              <span className="text-[#6A7482]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Deep Dive Links */}
                  <div className="pt-4 border-t border-[#1D232B] flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProjectForModal(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#090B0E] bg-[#B7FF5A] hover:bg-[#a6ec49] font-semibold px-3.5 py-2 transition-colors cursor-pointer"
                    >
                      <span>EXPLORE PROJECT</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#929BA7] hover:text-[#F3F5F7] px-3 py-2 border border-[#252B33] hover:border-[#353D47] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>REPOSITORY</span>
                        <ExternalLink className="w-3 h-3 text-[#6A7482]" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Interactive Visual Column (7 cols) */}
                <div className="lg:col-span-7 p-4 sm:p-6 bg-[#0B0E12] flex items-center justify-center">
                  {renderProjectVisual(project.id)}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Project Details Modal */}
      <ProjectDetailModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </section>
  );
};
