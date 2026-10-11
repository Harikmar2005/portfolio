import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Layers,
  Sparkles,
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

export const ResumeSection: React.FC = () => {
  const [pdfAvailable, setPdfAvailable] = useState<boolean | null>(null);
  const [activeView, setActiveView] = useState<'pdf' | 'summary'>('pdf');
  const resumeUrl = '/resume.pdf';

  // Check if /resume.pdf actually exists in public directory
  useEffect(() => {
    let isMounted = true;
    fetch(resumeUrl, { method: 'HEAD' })
      .then((res) => {
        if (!isMounted) return;
        // Verify response is OK and not 404
        if (res.ok && res.status !== 404) {
          setPdfAvailable(true);
        } else {
          // If HEAD is restricted, try a light GET range
          fetch(resumeUrl)
            .then((getRes) => {
              if (!isMounted) return;
              setPdfAvailable(getRes.ok && getRes.status !== 404);
            })
            .catch(() => {
              if (isMounted) setPdfAvailable(false);
            });
        }
      })
      .catch(() => {
        if (isMounted) setPdfAvailable(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="w-full py-16 px-4 max-w-6xl mx-auto"
      id="resume"
      aria-label="Resume and Credentials"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#252B33] pb-4 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#929BA7] mb-1">
            <span className="text-[#B7FF5A] font-semibold">VERIFIED CREDENTIALS</span>
            <span>·</span>
            <span>CURRICULUM VITAE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F5F7]">
            THE ENGINEER BEHIND THE SYSTEMS
          </h2>
          <p className="text-sm text-[#929BA7] mt-1 max-w-2xl font-sans">
            Computer Science and Engineering student specializing in Cybersecurity, graduating in 2028 from Sri Sairam Institute of Technology. Experienced in Python, FastAPI, Docker, Linux administration, and software supply-chain security tooling.
          </p>
        </div>

        {/* View & Download Actions (Top Right) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 font-mono text-xs">
          {pdfAvailable ? (
            <>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[#090B0E] bg-[#B7FF5A] hover:bg-[#a6ec49] font-bold transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>VIEW RESUME</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={resumeUrl}
                download="Harikumar_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[#F3F5F7] hover:text-[#B7FF5A] bg-[#11151A] hover:bg-[#151A21] border border-[#252B33] hover:border-[#B7FF5A] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </>
          ) : (
            <div className="text-[11px] font-mono text-[#929BA7] px-3 py-1.5 bg-[#11151A] border border-[#252B33]">
              STATUS: LOCAL PREVIEW MODE
            </div>
          )}
        </div>
      </div>

      {/* Main Resume Presentation Card */}
      <div className="border border-[#252B33] bg-[#090B0E]">
        {/* Sub-header Controls Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-[#252B33] bg-[#11151A] text-xs font-mono text-[#929BA7] gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[#F3F5F7] font-semibold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#B7FF5A]" />
              <span>HARIKUMAR_E_RESUME.PDF</span>
            </span>
            <span className="text-[#6A7482]">·</span>
            <span className="text-[11px] text-[#B7FF5A]">BATCH 2028</span>
          </div>

          {/* Toggle between PDF Embed and Formatted Document View */}
          <div className="flex items-center gap-1 bg-[#090B0E] p-0.5 border border-[#252B33]">
            <button
              onClick={() => setActiveView('pdf')}
              className={`px-2.5 py-1 text-[11px] transition-colors cursor-pointer ${
                activeView === 'pdf'
                  ? 'bg-[#1C232D] text-[#B7FF5A] font-semibold'
                  : 'text-[#6A7482] hover:text-[#929BA7]'
              }`}
            >
              PDF PREVIEW
            </button>
            <button
              onClick={() => setActiveView('summary')}
              className={`px-2.5 py-1 text-[11px] transition-colors cursor-pointer ${
                activeView === 'summary'
                  ? 'bg-[#1C232D] text-[#B7FF5A] font-semibold'
                  : 'text-[#6A7482] hover:text-[#929BA7]'
              }`}
            >
              DOCUMENT VIEW
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6">
          {activeView === 'pdf' ? (
            pdfAvailable === true ? (
              <div className="space-y-4">
                {/* Embedded PDF iframe with responsive height */}
                <div className="w-full h-[650px] sm:h-[820px] bg-[#11151A] border border-[#252B33] overflow-hidden relative">
                  <iframe
                    src={`${resumeUrl}#toolbar=0&navpanes=0`}
                    title="Harikumar E - Professional Resume"
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Mobile Fallback note */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#929BA7] p-3 bg-[#11151A] border border-[#252B33] gap-2">
                  <span>If your mobile browser does not display the embedded PDF frame:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B7FF5A] hover:underline flex items-center gap-1"
                    >
                      <span>Open in Browser</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span>·</span>
                    <button
                      onClick={() => setActiveView('summary')}
                      className="text-[#F3F5F7] hover:underline"
                    >
                      Switch to Document View
                    </button>
                  </div>
                </div>
              </div>
            ) : pdfAvailable === false ? (
              /* Fallback Placeholder when /resume.pdf is missing */
              <div className="p-8 sm:p-12 text-center border border-dashed border-[#252B33] bg-[#0E1217] space-y-4">
                <div className="w-12 h-12 mx-auto flex items-center justify-center bg-[#151A21] border border-[#353D47] text-amber-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="text-base font-bold text-[#F3F5F7] font-mono">
                    RESUME PDF PENDING UPLOAD
                  </h3>
                  <p className="text-xs text-[#929BA7] font-sans">
                    The file <code className="text-[#B7FF5A]">/resume.pdf</code> is awaiting placement in the public directory. A complete verified document transcript is provided below.
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('summary')}
                  className="px-4 py-2 bg-[#B7FF5A] text-[#090B0E] text-xs font-mono font-bold hover:bg-[#a6ec49] transition-colors cursor-pointer"
                >
                  VIEW VERIFIED RESUME TRANSCRIPT
                </button>
              </div>
            ) : (
              /* Loading State */
              <div className="p-16 text-center text-xs font-mono text-[#929BA7] space-y-2">
                <div className="w-5 h-5 mx-auto border-2 border-[#B7FF5A] border-t-transparent rounded-full animate-spin" />
                <span>VERIFYING RESUME ARTIFACT...</span>
              </div>
            )
          ) : (
            /* Document View (High-Fidelity Structured Transcript matching the PDF) */
            <div className="space-y-8 font-mono text-xs bg-[#0B0E12] p-4 sm:p-8 border border-[#1E242D]">
              {/* Header Box */}
              <div className="border-b border-[#252B33] pb-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F3F5F7] tracking-tight">
                    HARIKUMAR E
                  </h3>
                  <span className="text-[#B7FF5A] text-xs">
                    CSE (Cybersecurity) · Expected 2028
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[#929BA7] text-[11px]">
                  <span>Chennai, India</span>
                  <span>·</span>
                  <span>+91-9444465579</span>
                  <span>·</span>
                  <a
                    href="mailto:elangoharikumar@gmail.com"
                    className="text-[#F3F5F7] hover:text-[#B7FF5A] transition-colors"
                  >
                    elangoharikumar@gmail.com
                  </a>
                  <span>·</span>
                  <a
                    href="https://github.com/Harikmar2005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B7FF5A] hover:underline"
                  >
                    GitHub
                  </a>
                  <span>·</span>
                  <a
                    href="https://www.linkedin.com/in/harikumar-elango-a32072320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B7FF5A] hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#6A7482] uppercase tracking-wider block font-bold">
                  01. PROFESSIONAL SUMMARY
                </span>
                <p className="text-xs sm:text-sm text-[#D8DEE9] font-sans leading-relaxed">
                  Computer Science and Engineering student specializing in Cybersecurity, with hands-on experience in Python, FastAPI, Docker, Linux, REST APIs, and security tooling. Interested in software engineering, cloud infrastructure, and building reliable security-focused applications.
                </p>
              </div>

              {/* Education Grid */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#6A7482] uppercase tracking-wider block font-bold">
                  02. EDUCATION
                </span>
                <div className="p-3.5 bg-[#11151A] border border-[#252B33] space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#F3F5F7] font-semibold gap-1">
                    <span>Sri Sairam Institute of Technology</span>
                    <span className="text-[#B7FF5A] tabular-nums">Expected Graduation: 2028</span>
                  </div>
                  <div className="text-[#929BA7] text-[11px] font-sans">
                    B.E. in Computer Science and Engineering (Cybersecurity)
                  </div>
                  <div className="text-[#6A7482] text-[11px]">
                    CGPA: <span className="text-[#F3F5F7] font-semibold">7.79 / 10</span>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#6A7482] uppercase tracking-wider block font-bold">
                  03. EXPERIENCE
                </span>
                <div className="p-3.5 bg-[#11151A] border border-[#252B33] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#F3F5F7] font-semibold gap-1">
                    <span>DevOps & Containerization Intern</span>
                    <span className="text-[#B7FF5A] tabular-nums">Oct 2025 – Nov 2025</span>
                  </div>
                  <div className="text-xs text-[#929BA7]">
                    Vectra Technosoft Pvt. Ltd., Chennai
                  </div>
                  <ul className="space-y-1 text-[11px] text-[#D8DEE9] font-sans pl-4 list-disc">
                    <li>Containerized a To-Do application using Docker and deployed it in a Red Hat Enterprise Linux environment.</li>
                    <li>Practiced Docker networking, Linux administration, and containerized application troubleshooting.</li>
                  </ul>
                </div>
              </div>

              {/* Key Technical Projects */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#6A7482] uppercase tracking-wider block font-bold">
                  04. VERIFIED TECHNICAL PROJECTS
                </span>
                <div className="space-y-2">
                  <div className="p-3.5 bg-[#11151A] border border-[#252B33] space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold gap-1">
                      <span className="text-[#F3F5F7]">ChainProof — Software Supply-Chain Security</span>
                      <span className="text-[#929BA7] text-[10px]">Python, FastAPI, React, Docker</span>
                    </div>
                    <p className="text-[11px] text-[#929BA7] font-sans leading-relaxed">
                      Built a platform to assess container image integrity and software supply-chain security risks. Integrated SBOM generation, vulnerability scanning, and container signature verification using Syft, Docker Scout, and Cosign.
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#11151A] border border-[#252B33] space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold gap-1">
                      <span className="text-[#F3F5F7]">OfferGuard — AI-Powered Recruitment Fraud Detection</span>
                      <span className="text-[#929BA7] text-[10px]">React, TypeScript, Node.js, Express</span>
                    </div>
                    <p className="text-[11px] text-[#929BA7] font-sans leading-relaxed">
                      Developed an investigative platform to assess job and internship offers for recruitment fraud, suspicious payment demands, and impersonation risks. Implemented risk scoring, DNS A/MX verification, and evidence-chain tracking.
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#11151A] border border-[#252B33] space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold gap-1">
                      <span className="text-[#F3F5F7]">Vallam — Farmer Support Navigator</span>
                      <span className="text-[#929BA7] text-[10px]">React, TypeScript, FastAPI</span>
                    </div>
                    <p className="text-[11px] text-[#929BA7] font-sans leading-relaxed">
                      Developed a bilingual farmer-support navigator for discovering agricultural schemes and checking eligibility using explainable rule-based matching. Designed document-readiness checks and personalized step-by-step pathways.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications & Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#11151A] border border-[#252B33] space-y-2">
                  <span className="text-[10px] text-[#6A7482] uppercase tracking-wider block font-bold">
                    05. CERTIFICATIONS
                  </span>
                  <div className="space-y-1 text-[11px] text-[#D8DEE9]">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF5A] shrink-0 mt-0.5" />
                      <span>Red Hat Certified System Administrator (RHCSA) – Completed</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF5A] shrink-0 mt-0.5" />
                      <span>Certified Ethical Hacker (CEH) v13 – In Progress</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#11151A] border border-[#252B33] space-y-2">
                  <span className="text-[10px] text-[#6A7482] uppercase tracking-wider block font-bold">
                    06. AREAS OF INTEREST & LANGUAGES
                  </span>
                  <div className="space-y-1 text-[11px] text-[#D8DEE9]">
                    <div>
                      <span className="text-[#6A7482]">Interests: </span>
                      <span>Software Engineering, Cloud Security, DevSecOps, AppSec, AI Security</span>
                    </div>
                    <div>
                      <span className="text-[#6A7482]">Languages: </span>
                      <span>English, Tamil</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Strip */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#252B33] bg-[#0E1217] flex flex-wrap items-center justify-between text-xs font-mono text-[#929BA7] gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B7FF5A]" />
            <span className="text-[#F3F5F7]">ACADEMIC VERIFICATION HASH</span>
            <span>·</span>
            <span>SRI SAIRAM INSTITUTE OF TECHNOLOGY</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B7FF5A] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>VIEW RESUME</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <a
              href={resumeUrl}
              download="Harikumar_Resume.pdf"
              className="text-[#F3F5F7] hover:text-[#B7FF5A] flex items-center gap-1 transition-colors"
            >
              <Download className="w-3 h-3" />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
