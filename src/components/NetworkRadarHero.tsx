import React, { useState, useEffect, useRef } from 'react';

interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'neutral' | 'active' | 'flagged';
  type: string;
  packets: number;
  hash: string;
  latency: string;
}

export const NetworkRadarHero: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NetworkNode | null>(null);
  const [sweepAngle, setSweepAngle] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [nodes, setNodes] = useState<NetworkNode[]>([
    { id: 'NODE_01', label: 'CORE_GATEWAY', x: 250, y: 190, status: 'active', type: 'Ingress Point', packets: 1420, hash: '0x8F9B2A', latency: '4ms' },
    { id: 'NODE_02', label: 'DEP_SENTINEL', x: 130, y: 110, status: 'neutral', type: 'Supply Auditor', packets: 830, hash: '0x1C4D9E', latency: '12ms' },
    { id: 'NODE_03', label: 'ANOMALY_PROBE', x: 380, y: 120, status: 'flagged', type: 'Heuristic Scanner', packets: 2150, hash: '0x7E3F10', latency: '19ms' },
    { id: 'NODE_04', label: 'INTEGRITY_CHECK', x: 390, y: 280, status: 'neutral', type: 'Cryptographic Verifier', packets: 670, hash: '0x5A2B8C', latency: '8ms' },
    { id: 'NODE_05', label: 'TELEMETRY_RX', x: 140, y: 290, status: 'active', type: 'Flow Collector', packets: 1980, hash: '0x3D7F5B', latency: '6ms' },
    { id: 'NODE_06', label: 'SUBGRAPH_DAG', x: 240, y: 60, status: 'neutral', type: 'Tree Traversal', packets: 420, hash: '0x99A04B', latency: '15ms' },
    { id: 'NODE_07', label: 'REGISTRY_SYNC', x: 80, y: 200, status: 'neutral', type: 'Package Indexer', packets: 560, hash: '0x22F881', latency: '22ms' },
    { id: 'NODE_08', label: 'SIGNAL_DETECTED', x: 330, y: 350, status: 'flagged', type: 'Egress Monitor', packets: 1840, hash: '0xAA77C0', latency: '11ms' },
  ]);

  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 5],
    [2, 5],
    [1, 6],
    [4, 6],
    [3, 7],
    [4, 7],
  ];

  // Animation frame for radar sweep and connection pulse
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setSweepAngle((prev) => (prev + 0.75) % 360);
      setPulsePhase((prev) => (prev + 0.02) % 1);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Periodic subtle status rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((n, i) => {
          if (i === 2 || i === 7) {
            // keep flagged nodes responsive
            return { ...n, packets: n.packets + Math.floor(Math.random() * 5) };
          }
          return { ...n, packets: n.packets + Math.floor(Math.random() * 3) };
        })
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Default active node for display if none hovered
  const displayNode = activeNode || nodes[2];

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto border border-[#252B33] bg-[#0B0E12] p-4 flex flex-col justify-between">
      {/* Visual Header / Metadata */}
      <div className="flex items-center justify-between border-b border-[#252B33] pb-2 text-[11px] font-mono text-[#929BA7]">
        <div className="flex items-center gap-2">
          <span className="text-[#B7FF5A] font-semibold">HK_NET_SURVEILLANCE</span>
          <span>·</span>
          <span>DAG_TOPOLOGY_V1</span>
        </div>
        <div className="flex items-center gap-2">
          <span>PROBE: ACTIVE</span>
          <span className="inline-block w-1.5 h-1.5 bg-[#B7FF5A] rounded-full" />
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative flex-1 my-2 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full select-none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Linear gradient for radar sweep beam */}
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B7FF5A" stopOpacity="0.12" />
              <stop offset="70%" stopColor="#B7FF5A" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#B7FF5A" stopOpacity="0" />
            </radialGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric radar range rings */}
          <circle cx="250" cy="190" r="60" fill="none" stroke="#252B33" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="250" cy="190" r="120" fill="none" stroke="#252B33" strokeWidth="1" />
          <circle cx="250" cy="190" r="180" fill="none" stroke="#252B33" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

          {/* Crosshairs */}
          <line x1="70" y1="190" x2="430" y2="190" stroke="#1D232B" strokeWidth="1" />
          <line x1="250" y1="10" x2="250" y2="370" stroke="#1D232B" strokeWidth="1" />

          {/* Rotating radar sweep ray */}
          <g transform={`rotate(${sweepAngle} 250 190)`}>
            <line x1="250" y1="190" x2="430" y2="190" stroke="#B7FF5A" strokeWidth="1.2" opacity="0.75" />
            <path
              d="M 250 190 L 430 190 A 180 180 0 0 0 406 100 Z"
              fill="url(#radarSweep)"
            />
          </g>

          {/* Connecting Edges */}
          {edges.map(([fromIdx, toIdx], i) => {
            const from = nodes[fromIdx];
            const to = nodes[toIdx];
            const isFlaggedEdge = from.status === 'flagged' || to.status === 'flagged';

            // calculate animated packet position along line
            const packetX = from.x + (to.x - from.x) * ((pulsePhase + i * 0.1) % 1);
            const packetY = from.y + (to.y - from.y) * ((pulsePhase + i * 0.1) % 1);

            return (
              <g key={`edge-${i}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isFlaggedEdge ? '#B7FF5A' : '#252B33'}
                  strokeWidth={isFlaggedEdge ? 1.5 : 1}
                  strokeOpacity={isFlaggedEdge ? 0.6 : 0.4}
                />
                {/* Moving signal pulse */}
                <circle
                  cx={packetX}
                  cy={packetY}
                  r={isFlaggedEdge ? 2.5 : 1.8}
                  fill={isFlaggedEdge ? '#B7FF5A' : '#929BA7'}
                  opacity={0.8}
                />
              </g>
            );
          })}

          {/* Graph Nodes */}
          {nodes.map((node) => {
            const isHovered = activeNode?.id === node.id;
            const isFlagged = node.status === 'flagged';
            const isActive = node.status === 'active';

            return (
              <g
                key={node.id}
                className="cursor-pointer transition-transform duration-150"
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setActiveNode(node)}
                onClick={() => setActiveNode(node)}
              >
                {/* Outer halo on active/flagged/hovered */}
                {(isFlagged || isHovered) && (
                  <circle
                    r={isHovered ? 16 : 12}
                    fill="none"
                    stroke="#B7FF5A"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.8"
                    className="animate-spin"
                    style={{ animationDuration: '6s', transformOrigin: '0 0' }}
                  />
                )}

                {/* Node Base Circle */}
                <circle
                  r={isHovered ? 8 : 6}
                  fill={isFlagged ? '#111812' : '#0B0E12'}
                  stroke={isFlagged ? '#B7FF5A' : isActive ? '#929BA7' : '#353D47'}
                  strokeWidth={isFlagged || isHovered ? 2 : 1.5}
                />

                {/* Core dot */}
                <circle
                  r={isFlagged ? 3 : 2}
                  fill={isFlagged ? '#B7FF5A' : isActive ? '#F3F5F7' : '#6A7482'}
                />

                {/* Node Label Text */}
                <text
                  x={8}
                  y={-8}
                  fill={isFlagged ? '#B7FF5A' : isHovered ? '#F3F5F7' : '#6A7482'}
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={isFlagged || isHovered ? '600' : '400'}
                  className="pointer-events-none select-none"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Node Inspection Telemetry Box */}
      <div className="border border-[#252B33] bg-[#11151A] p-2.5 text-xs font-mono">
        <div className="flex items-center justify-between text-[11px] mb-1.5 border-b border-[#252B33] pb-1">
          <span className="text-[#F3F5F7] font-semibold">{displayNode.id} · {displayNode.label}</span>
          <span className={`px-1.5 py-0.2 text-[10px] ${displayNode.status === 'flagged' ? 'text-[#B7FF5A] font-bold' : 'text-[#929BA7]'}`}>
            {displayNode.status === 'flagged' ? 'SIGNAL_ALERT' : 'STATUS_NOMINAL'}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#929BA7]">
          <div>
            <span className="block text-[#6A7482] text-[10px]">TYPE</span>
            <span className="text-[#F3F5F7] truncate block">{displayNode.type}</span>
          </div>
          <div>
            <span className="block text-[#6A7482] text-[10px]">PACKET FLOW</span>
            <span className="text-[#F3F5F7] tabular-nums">{displayNode.packets} pkts/s</span>
          </div>
          <div>
            <span className="block text-[#6A7482] text-[10px]">CHECKSUM</span>
            <span className="text-[#F3F5F7]">{displayNode.hash}</span>
          </div>
          <div>
            <span className="block text-[#6A7482] text-[10px]">LATENCY</span>
            <span className="text-[#B7FF5A] tabular-nums">{displayNode.latency}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
