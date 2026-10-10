import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, GitFork, Info } from 'lucide-react';

interface DepNode {
  id: string;
  name: string;
  version: string;
  type: 'root' | 'direct' | 'transitive' | 'suspicious';
  depth: number;
  cx: number;
  cy: number;
  license: string;
  anomalyReason?: string;
  heuristics: string[];
}

export const ChainProofGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('suspicious-pkg');

  const nodes: DepNode[] = [
    {
      id: 'root-app',
      name: 'core-service',
      version: '1.0.0',
      type: 'root',
      depth: 0,
      cx: 60,
      cy: 160,
      license: 'MIT',
      heuristics: ['Root manifest target', 'Internal codebase boundary'],
    },
    {
      id: 'fastapi-pkg',
      name: 'fastapi-gateway',
      version: '0.110.0',
      type: 'direct',
      depth: 1,
      cx: 180,
      cy: 80,
      license: 'MIT',
      heuristics: ['Direct requirement', 'Signed author commit history'],
    },
    {
      id: 'crypto-pkg',
      name: 'py-cryptography',
      version: '42.0.5',
      type: 'direct',
      depth: 1,
      cx: 180,
      cy: 240,
      license: 'Apache-2.0',
      heuristics: ['Verified build artifacts', 'Hardware security interface'],
    },
    {
      id: 'pydantic-pkg',
      name: 'pydantic-core',
      version: '2.16.3',
      type: 'transitive',
      depth: 2,
      cx: 300,
      cy: 60,
      license: 'MIT',
      heuristics: ['Compiled binary wheel', 'High ecosystem adoption'],
    },
    {
      id: 'suspicious-pkg',
      name: 'event-stream-hook',
      version: '0.4.2',
      type: 'suspicious',
      depth: 2,
      cx: 310,
      cy: 150,
      license: 'Unspecified',
      anomalyReason: 'Anomalous pre-install lifecycle script executes outbound network socket.',
      heuristics: [
        'FLAG_1: setup.py contains encoded base64 socket invocation',
        'FLAG_2: Maintainer public GPG key replaced within 36 hours of publication',
        'FLAG_3: High Levenshtein similarity to established utility (event-stream)',
      ],
    },
    {
      id: 'cffi-pkg',
      name: 'cffi-bindings',
      version: '1.16.0',
      type: 'transitive',
      depth: 2,
      cx: 300,
      cy: 250,
      license: 'MIT',
      heuristics: ['Standard C foreign function interface', 'Zero anomalous delta'],
    },
    {
      id: 'terminal-dep',
      name: 'asn1-crypto-leaf',
      version: '1.5.1',
      type: 'transitive',
      depth: 3,
      cx: 420,
      cy: 220,
      license: 'MIT',
      heuristics: ['Verified dependency leaf node', 'Static metadata match'],
    },
  ];

  const links = [
    { source: 'root-app', target: 'fastapi-pkg' },
    { source: 'root-app', target: 'crypto-pkg' },
    { source: 'fastapi-pkg', target: 'pydantic-pkg' },
    { source: 'fastapi-pkg', target: 'suspicious-pkg' },
    { source: 'crypto-pkg', target: 'cffi-pkg' },
    { source: 'crypto-pkg', target: 'terminal-dep' },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[4];

  return (
    <div className="w-full border border-[#252B33] bg-[#0B0E12] p-4 flex flex-col gap-3">
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-[#252B33] pb-2 text-xs font-mono text-[#929BA7]">
        <div className="flex items-center gap-2">
          <span className="text-[#B7FF5A] font-semibold">CHAINPROOF_DAG_VIEWER</span>
          <span>·</span>
          <span>TRANSITIVE_TREE</span>
        </div>
        <div className="text-[11px] text-[#6A7482]">
          CLICK NODES TO AUDIT RISK VECTORS
        </div>
      </div>

      {/* Interactive SVG Diagram */}
      <div className="relative w-full aspect-[16/9] min-h-[220px] max-h-[300px] bg-[#080A0D] border border-[#1D232B] overflow-hidden">
        <svg viewBox="0 0 480 320" className="w-full h-full select-none">
          {/* Depth column lines */}
          <line x1="60" y1="20" x2="60" y2="300" stroke="#161B22" strokeDasharray="3 3" />
          <line x1="180" y1="20" x2="180" y2="300" stroke="#161B22" strokeDasharray="3 3" />
          <line x1="300" y1="20" x2="300" y2="300" stroke="#161B22" strokeDasharray="3 3" />
          <line x1="420" y1="20" x2="420" y2="300" stroke="#161B22" strokeDasharray="3 3" />

          {/* Depth headers */}
          <text x="60" y="24" fill="#6A7482" fontSize="9" textAnchor="middle" fontFamily="monospace">DEPTH 0</text>
          <text x="180" y="24" fill="#6A7482" fontSize="9" textAnchor="middle" fontFamily="monospace">DEPTH 1 (DIRECT)</text>
          <text x="300" y="24" fill="#6A7482" fontSize="9" textAnchor="middle" fontFamily="monospace">DEPTH 2 (TRANSITIVE)</text>
          <text x="420" y="24" fill="#6A7482" fontSize="9" textAnchor="middle" fontFamily="monospace">DEPTH 3 (LEAF)</text>

          {/* Links */}
          {links.map((link, idx) => {
            const s = nodes.find((n) => n.id === link.source)!;
            const t = nodes.find((n) => n.id === link.target)!;
            const isSuspiciousPath = t.type === 'suspicious' || s.type === 'suspicious';

            // Curved cubic bezier path
            const dx = (t.cx - s.cx) / 2;
            const pathD = `M ${s.cx} ${s.cy} C ${s.cx + dx} ${s.cy}, ${t.cx - dx} ${t.cy}, ${t.cx} ${t.cy}`;

            return (
              <g key={`l-${idx}`}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={isSuspiciousPath ? '#B7FF5A' : '#252B33'}
                  strokeWidth={isSuspiciousPath ? 1.8 : 1}
                  strokeDasharray={isSuspiciousPath ? '4 2' : undefined}
                  opacity={isSuspiciousPath ? 0.9 : 0.5}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const isSuspicious = node.type === 'suspicious';

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onClick={() => setSelectedNodeId(node.id)}
                transform={`translate(${node.cx}, ${node.cy})`}
              >
                {/* Highlight ring */}
                {isSelected && (
                  <circle
                    r="15"
                    fill="none"
                    stroke={isSuspicious ? '#B7FF5A' : '#F3F5F7'}
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Node circle */}
                <circle
                  r={node.type === 'root' ? 10 : 8}
                  fill={isSuspicious ? '#192215' : '#11151A'}
                  stroke={isSuspicious ? '#B7FF5A' : isSelected ? '#F3F5F7' : '#353D47'}
                  strokeWidth={isSuspicious ? 2 : 1.5}
                />

                {/* Inner dot */}
                <circle
                  r="3"
                  fill={isSuspicious ? '#B7FF5A' : node.type === 'root' ? '#F3F5F7' : '#6A7482'}
                />

                {/* Node text label */}
                <text
                  x="0"
                  y={node.cy > 180 ? 18 : -14}
                  textAnchor="middle"
                  fill={isSuspicious ? '#B7FF5A' : isSelected ? '#F3F5F7' : '#929BA7'}
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={isSelected || isSuspicious ? '600' : '400'}
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Inspection Card */}
      <div className="border border-[#252B33] bg-[#11151A] p-3 text-xs font-mono">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#252B33] pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#F3F5F7] font-semibold">{selectedNode.name}</span>
            <span className="text-[#6A7482]">@{selectedNode.version}</span>
            <span className="text-[10px] text-[#929BA7] px-1.5 py-0.5 bg-[#181E26] border border-[#252B33]">
              Depth: {selectedNode.depth}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {selectedNode.type === 'suspicious' ? (
              <span className="text-[#B7FF5A] font-bold flex items-center gap-1 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5" />
                SUSPICIOUS ANOMALY FLAGGED
              </span>
            ) : (
              <span className="text-[#929BA7] flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6A7482]" />
                VERIFIED NOMINAL
              </span>
            )}
          </div>
        </div>

        {selectedNode.anomalyReason && (
          <div className="mb-2 text-[#B7FF5A] text-[11px] bg-[#152115] border border-[#2D4523] p-2 leading-relaxed">
            {selectedNode.anomalyReason}
          </div>
        )}

        <div className="space-y-1">
          <span className="text-[10px] text-[#6A7482] uppercase tracking-wider block">Verification Heuristics:</span>
          <div className="space-y-0.5">
            {selectedNode.heuristics.map((h, i) => (
              <div key={i} className="text-[#929BA7] text-[11px] flex items-start gap-1.5">
                <span className="text-[#6A7482]">›</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
