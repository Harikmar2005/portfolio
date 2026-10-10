import React, { useState, useEffect } from 'react';
import {
  GraphNode,
  GraphEdge,
  NodeCategory,
  initialGraphNodes,
  graphEdges,
  categoryMeta,
} from '../data/networkGraphData';
import {
  Shield,
  Activity,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Info,
  GitBranch,
  ArrowUpRight,
} from 'lucide-react';

export const ThreatSurfaceSection: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('APPLICATION_01');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);

  // Animation pulse loop for signals along connections
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setPulsePhase((prev) => (prev + 0.008) % 1);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const activeFocusId = hoveredNodeId || selectedNodeId;

  // Determine connected node IDs for current active focus
  const activeNode = initialGraphNodes.find((n) => n.id === activeFocusId);
  const directConnectedIds = new Set<string>();

  if (activeNode) {
    directConnectedIds.add(activeNode.id);
    activeNode.connections.forEach((cid) => directConnectedIds.add(cid));
  }

  // Selected node for info panel
  const infoNode =
    initialGraphNodes.find((n) => n.id === selectedNodeId) || initialGraphNodes[0];

  const handleResetView = () => {
    setSelectedNodeId(null);
    setHoveredNodeId(null);
  };

  const handleNodeClick = (nodeId: string) => {
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    } else {
      setSelectedNodeId(nodeId);
    }
  };

  return (
    <section
      className="w-full py-16 px-4 max-w-6xl mx-auto"
      id="threat-surface"
      aria-label="Threat Surface and Network Intelligence"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#252B33] pb-4 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#929BA7] mb-1">
            <span className="text-[#B7FF5A] font-semibold">INTERACTIVE TOPOLOGY</span>
            <span>·</span>
            <span>SYSTEM GRAPH ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F5F7]">
            THREAT SURFACE / NETWORK INTELLIGENCE
          </h2>
          <p className="text-sm text-[#929BA7] mt-1">
            Explore the connections between software components, security signals, and system integrity.
          </p>
        </div>

        {/* Controls & Reset */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetView}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#929BA7] hover:text-[#B7FF5A] border border-[#252B33] hover:border-[#B7FF5A] transition-colors cursor-pointer"
            title="Reset active node focus and highlights"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET VIEW</span>
          </button>
        </div>
      </div>

      {/* Main Graph Workbench Grid */}
      <div className="border border-[#252B33] bg-[#090B0E] grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left / Top: Interactive SVG Network Canvas (8 cols desktop) */}
        <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#252B33] relative">
          {/* Canvas Sub-Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#929BA7] mb-3 pb-2 border-b border-[#1D232B]">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#B7FF5A]" />
              <span className="text-[#F3F5F7] font-semibold">TOPOLOGY_CANVAS</span>
              <span>·</span>
              <span className="text-[11px] text-[#6A7482]">10 NODES / 14 VECTORS</span>
            </div>
            <div className="text-[11px] text-[#6A7482]">
              CLICK NODE TO AUDIT OR HOVER TO HIGHLIGHT
            </div>
          </div>

          {/* SVG Canvas Area */}
          <div className="relative w-full aspect-[16/10] min-h-[300px] sm:min-h-[380px] bg-[#080A0D] border border-[#161B22] overflow-hidden">
            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-lab-grid opacity-25 pointer-events-none" />

            <svg
              viewBox="0 0 740 480"
              className="w-full h-full select-none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Glow filter for highlighted lines and nodes */}
                <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Edges */}
              {graphEdges.map((edge) => {
                const sNode = initialGraphNodes.find((n) => n.id === edge.source)!;
                const tNode = initialGraphNodes.find((n) => n.id === edge.target)!;

                const isConnectedToFocus =
                  activeFocusId &&
                  (edge.source === activeFocusId || edge.target === activeFocusId);

                const isMuted =
                  activeFocusId && !isConnectedToFocus;

                // Position of animated signal packet travelling along edge
                const packetX = sNode.x + (tNode.x - sNode.x) * pulsePhase;
                const packetY = sNode.y + (tNode.y - sNode.y) * pulsePhase;

                return (
                  <g key={edge.id}>
                    {/* Line connection */}
                    <line
                      x1={sNode.x}
                      y1={sNode.y}
                      x2={tNode.x}
                      y2={tNode.y}
                      stroke={isConnectedToFocus ? '#B7FF5A' : '#252B33'}
                      strokeWidth={isConnectedToFocus ? 1.8 : 1}
                      strokeOpacity={isMuted ? 0.2 : isConnectedToFocus ? 0.9 : 0.55}
                      strokeDasharray={isConnectedToFocus ? '4 2' : undefined}
                      className="transition-all duration-200"
                    />

                    {/* Animated moving pulse packet on highlighted edge */}
                    {isConnectedToFocus && (
                      <circle
                        cx={packetX}
                        cy={packetY}
                        r="2.5"
                        fill="#B7FF5A"
                        filter="url(#nodeGlow)"
                      />
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {initialGraphNodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isHovered = hoveredNodeId === node.id;
                const isDirectConnection = directConnectedIds.has(node.id);
                const isMuted = activeFocusId && !isDirectConnection;
                const meta = categoryMeta[node.category];

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer transition-transform duration-150"
                    onClick={() => handleNodeClick(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select node ${node.name}, category ${node.category}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNodeClick(node.id);
                      }
                    }}
                  >
                    {/* Outer Target halo on selection or hover */}
                    {(isSelected || isHovered) && (
                      <circle
                        r="20"
                        fill="none"
                        stroke="#B7FF5A"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                        opacity="0.8"
                        className="animate-spin"
                        style={{ animationDuration: '8s', transformOrigin: '0 0' }}
                      />
                    )}

                    {/* Secondary connector ring */}
                    {isDirectConnection && !isSelected && !isHovered && (
                      <circle
                        r="14"
                        fill="none"
                        stroke={meta.color}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        opacity="0.6"
                      />
                    )}

                    {/* Node Body Circle */}
                    <circle
                      r={isSelected || isHovered ? 11 : 8}
                      fill={meta.bg}
                      stroke={
                        isSelected || isHovered
                          ? '#B7FF5A'
                          : isDirectConnection
                          ? meta.color
                          : isMuted
                          ? '#1C232B'
                          : meta.border
                      }
                      strokeWidth={isSelected || isHovered ? 2 : 1.5}
                      opacity={isMuted ? 0.35 : 1}
                      className="transition-all duration-150"
                    />

                    {/* Center point */}
                    <circle
                      r={isSelected || isHovered ? 4 : 2.5}
                      fill={
                        isSelected || isHovered
                          ? '#B7FF5A'
                          : isDirectConnection
                          ? meta.color
                          : isMuted
                          ? '#353D47'
                          : meta.color
                      }
                      opacity={isMuted ? 0.4 : 1}
                    />

                    {/* Node Text Label */}
                    <text
                      x="0"
                      y={node.y > 380 ? -16 : 20}
                      textAnchor="middle"
                      fill={
                        isSelected || isHovered
                          ? '#B7FF5A'
                          : isDirectConnection
                          ? '#F3F5F7'
                          : isMuted
                          ? '#4B5563'
                          : '#929BA7'
                      }
                      fontSize="9.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight={isSelected || isHovered ? '700' : '500'}
                      className="pointer-events-none select-none transition-colors duration-150"
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Category Legend Bar */}
          <div className="pt-4 border-t border-[#1D232B] flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-[10px] text-[#6A7482] uppercase tracking-wider">
              LEGEND:
            </span>
            {(Object.keys(categoryMeta) as NodeCategory[]).map((cat) => {
              const meta = categoryMeta[cat];
              return (
                <div key={cat} className="flex items-center gap-1.5 text-[11px] text-[#929BA7]">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full border"
                    style={{ backgroundColor: meta.bg, borderColor: meta.color }}
                  />
                  <span>{cat}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right / Bottom: Compact Information Panel (4 cols desktop) */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-[#0E1217] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header of Info Card */}
            <div className="border-b border-[#252B33] pb-3 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span
                  className="px-2 py-0.5 border text-[10px]"
                  style={{
                    color: categoryMeta[infoNode.category].color,
                    borderColor: categoryMeta[infoNode.category].border,
                    backgroundColor: categoryMeta[infoNode.category].bg,
                  }}
                >
                  {infoNode.category}
                </span>
                <span className="text-[#6A7482] text-[10px]">
                  STATUS: {infoNode.status}
                </span>
              </div>

              <h3 className="text-xl font-bold font-mono text-[#F3F5F7] tracking-tight pt-1">
                {infoNode.name}
              </h3>
              <p className="text-xs text-[#B7FF5A] font-mono">
                {infoNode.technicalRole}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1.5 font-sans">
              <span className="text-[10px] font-mono text-[#6A7482] uppercase tracking-wider block">
                COMPONENT SPECIFICATION:
              </span>
              <p className="text-xs sm:text-sm text-[#D8DEE9] leading-relaxed">
                {infoNode.description}
              </p>
            </div>

            {/* Invariant Attributes */}
            <div className="space-y-1.5 font-mono text-xs border-t border-[#1D232B] pt-3">
              <span className="text-[10px] text-[#6A7482] uppercase tracking-wider block">
                SYSTEM ATTRIBUTES:
              </span>
              <div className="space-y-1">
                {infoNode.attributes.map((attr, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-[#11151A] border border-[#252B33] flex items-center justify-between text-[11px]"
                  >
                    <span className="text-[#6A7482]">{attr.label}</span>
                    <span className="text-[#F3F5F7] font-semibold">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Connections */}
            <div className="space-y-1.5 font-mono text-xs border-t border-[#1D232B] pt-3">
              <div className="flex items-center justify-between text-[10px] text-[#6A7482] uppercase tracking-wider">
                <span>DIRECT CONNECTIONS ({infoNode.connections.length})</span>
                <span className="text-[#B7FF5A]">ACTIVE LINK</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {infoNode.connections.map((cid) => (
                  <button
                    key={cid}
                    onClick={() => setSelectedNodeId(cid)}
                    className="px-2 py-0.5 bg-[#151A21] hover:bg-[#1D2530] border border-[#252B33] hover:border-[#B7FF5A] text-[#929BA7] hover:text-[#F3F5F7] text-[10px] cursor-pointer transition-colors"
                  >
                    {cid}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Guidance Note */}
          <div className="pt-3 border-t border-[#252B33] text-[11px] font-mono text-[#6A7482] flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#B7FF5A] shrink-0 mt-0.5" />
            <span>
              Illustrative architectural model. Demonstrates software dependency boundaries and security signals.
            </span>
          </div>
        </div>
      </div>

      {/* 3. RELATED INVESTIGATION: ChainProof Feature */}
      <div className="mt-8 border border-[#252B33] bg-[#0E1217] p-5 sm:p-6 transition-colors hover:border-[#353D47]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#929BA7]">
              <GitBranch className="w-3.5 h-3.5 text-[#B7FF5A]" />
              <span className="text-[#B7FF5A] font-semibold">RELATED INVESTIGATION</span>
              <span>·</span>
              <span className="text-[#F3F5F7]">PROJECT 01</span>
            </div>

            <h3 className="text-xl font-bold font-mono text-[#F3F5F7] tracking-tight">
              ChainProof — Software Supply-Chain Security
            </h3>

            <p className="text-xs sm:text-sm text-[#929BA7] font-sans leading-relaxed">
              Software supply-chain security through component analysis, vulnerability intelligence, and software integrity verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
            <a
              href="https://github.com/Harikmar2005/Chainproof"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#B7FF5A] hover:bg-[#a6ec49] text-[#090B0E] font-bold transition-colors cursor-pointer"
            >
              <span>EXPLORE CHAINPROOF</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#11151A] hover:bg-[#161D24] text-[#929BA7] hover:text-[#F3F5F7] border border-[#252B33] hover:border-[#353D47] transition-colors cursor-pointer"
            >
              <span>VIEW IN SELECTED PROJECTS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
