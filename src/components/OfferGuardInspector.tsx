import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Shield, Clock } from 'lucide-react';

interface SignalCheck {
  id: string;
  label: string;
  status: 'passed' | 'failed' | 'warning';
  detail: string;
  weight: string;
}

export const OfferGuardInspector: React.FC = () => {
  const [scenario, setScenario] = useState<'suspicious' | 'legitimate'>('suspicious');

  const suspiciousSignals: SignalCheck[] = [
    {
      id: 'sig-1',
      label: 'Sender Domain & Corporate DNS MX Alignment',
      status: 'failed',
      detail: 'Communication originated from free webmail provider (gmail.com) claiming corporate brand identity.',
      weight: 'HIGH RISK',
    },
    {
      id: 'sig-2',
      label: 'Domain Registration Age & WHOIS Record',
      status: 'failed',
      detail: 'Referenced interview portal domain registered 11 days prior to solicitation.',
      weight: 'HIGH RISK',
    },
    {
      id: 'sig-3',
      label: 'Cryptographic Email Auth (SPF / DKIM / DMARC)',
      status: 'warning',
      detail: 'DMARC alignment failure; sender header envelope mismatches apparent organizational origin.',
      weight: 'MEDIUM RISK',
    },
    {
      id: 'sig-4',
      label: 'Upfront Payment / Equipment Check Heuristic',
      status: 'failed',
      detail: 'Unsolicited request to deposit fake check or transfer funds for home office hardware.',
      weight: 'CRITICAL',
    },
  ];

  const legitimateSignals: SignalCheck[] = [
    {
      id: 'sig-1',
      label: 'Sender Domain & Corporate DNS MX Alignment',
      status: 'passed',
      detail: 'Sender domain matches enterprise primary MX host with verified mail routing.',
      weight: 'VERIFIED',
    },
    {
      id: 'sig-2',
      label: 'Domain Registration Age & WHOIS Record',
      status: 'passed',
      detail: 'Domain established > 12 years with verified organizational registrant record.',
      weight: 'VERIFIED',
    },
    {
      id: 'sig-3',
      label: 'Cryptographic Email Auth (SPF / DKIM / DMARC)',
      status: 'passed',
      detail: 'SPF PASS and DKIM signature verified against published 2048-bit enterprise public key.',
      weight: 'VERIFIED',
    },
    {
      id: 'sig-4',
      label: 'Upfront Payment / Equipment Check Heuristic',
      status: 'passed',
      detail: 'No deposit, fee, or payment mechanics requested; standard HR portal onboarding.',
      weight: 'NOMINAL',
    },
  ];

  const signals = scenario === 'suspicious' ? suspiciousSignals : legitimateSignals;

  return (
    <div className="w-full border border-[#252B33] bg-[#0B0E12] p-4 flex flex-col gap-3 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#252B33] pb-2 text-xs text-[#929BA7]">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#B7FF5A]" />
          <span className="text-[#F3F5F7] font-semibold">OFFER_GUARD_EVIDENCE_PROBER</span>
          <span>·</span>
          <span>MULTI_SIGNAL_PIPELINE</span>
        </div>
        <span className="text-[10px] text-[#6A7482]">CONCEPT PROTOTYPE</span>
      </div>

      {/* Scenario switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] text-[#6A7482]">SIMULATED SIGNAL TRACE:</span>
        <div className="flex items-center gap-1 bg-[#11151A] p-0.5 border border-[#252B33]">
          <button
            onClick={() => setScenario('suspicious')}
            className={`px-2.5 py-1 text-xs transition-colors ${
              scenario === 'suspicious'
                ? 'bg-[#2A1818] text-[#FCA5A5] border border-[#5A2525]'
                : 'text-[#929BA7] hover:text-[#F3F5F7]'
            }`}
          >
            SUSPICIOUS SOLICITATION
          </button>
          <button
            onClick={() => setScenario('legitimate')}
            className={`px-2.5 py-1 text-xs transition-colors ${
              scenario === 'legitimate'
                ? 'bg-[#152317] text-[#B7FF5A] border border-[#2A472E]'
                : 'text-[#929BA7] hover:text-[#F3F5F7]'
            }`}
          >
            VERIFIED CORPORATE OFFER
          </button>
        </div>
      </div>

      {/* Signals Checklist */}
      <div className="space-y-2 border border-[#1D232B] bg-[#0E1217] p-3">
        {signals.map((sig, idx) => {
          const isPassed = sig.status === 'passed';
          const isFailed = sig.status === 'failed';

          return (
            <div
              key={sig.id}
              className={`p-2.5 border text-xs transition-colors ${
                isFailed
                  ? 'border-[#3D2525] bg-[#140E0E]'
                  : isPassed
                  ? 'border-[#253A22] bg-[#0E1410]'
                  : 'border-[#3A3322] bg-[#14120E]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#6A7482]">STEP 0{idx + 1}</span>
                  <span className="text-[#F3F5F7] font-semibold">{sig.label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[10px] px-1.5 py-0.2 border ${
                      isFailed
                        ? 'text-[#F87171] border-[#5A2525] bg-[#221515]'
                        : isPassed
                        ? 'text-[#B7FF5A] border-[#2E4A28] bg-[#121E14]'
                        : 'text-amber-300 border-amber-900 bg-amber-950/40'
                    }`}
                  >
                    {sig.weight}
                  </span>
                  {isFailed ? (
                    <XCircle className="w-3.5 h-3.5 text-[#F87171]" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF5A]" />
                  )}
                </div>
              </div>
              <p className="text-[11px] text-[#929BA7] pl-6 leading-relaxed">
                {sig.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Outcome Verdict Bar */}
      <div
        className={`p-2.5 border text-xs flex items-center justify-between ${
          scenario === 'suspicious'
            ? 'bg-[#1C1212] border-[#4A2222] text-[#FCA5A5]'
            : 'bg-[#121A14] border-[#254228] text-[#B7FF5A]'
        }`}
      >
        <div className="flex items-center gap-2">
          {scenario === 'suspicious' ? (
            <AlertTriangle className="w-4 h-4 text-[#F87171]" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#B7FF5A]" />
          )}
          <span className="font-semibold">
            {scenario === 'suspicious'
              ? 'VERIFICATION OUTCOME: ANOMALY SIGNALS ELEVATED'
              : 'VERIFICATION OUTCOME: ALL TRUST SIGNALS VALIDATED'}
          </span>
        </div>
        <span className="text-[10px] opacity-80">
          {scenario === 'suspicious' ? '4/4 HEURISTICS FLAGGED' : '4/4 CHECKS PASSED'}
        </span>
      </div>
    </div>
  );
};
