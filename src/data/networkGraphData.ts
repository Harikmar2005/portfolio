/**
 * Network intelligence & threat surface node topology.
 * Illustrative sample graph for interactive security exploration.
 */

export type NodeCategory =
  | 'Application'
  | 'Dependency'
  | 'Security Signal'
  | 'Integrity Check'
  | 'External Service';

export interface GraphNode {
  id: string;
  name: string;
  category: NodeCategory;
  x: number;
  y: number;
  technicalRole: string;
  status: string;
  description: string;
  connections: string[]; // Connected node IDs
  attributes: {
    label: string;
    value: string;
  }[];
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export const categoryMeta: Record<
  NodeCategory,
  { color: string; border: string; bg: string; description: string }
> = {
  Application: {
    color: '#B7FF5A',
    border: '#2E4A28',
    bg: '#121F14',
    description: 'Core application services, execution engines, and local execution runtimes.',
  },
  Dependency: {
    color: '#38BDF8',
    border: '#1E3A5F',
    bg: '#0F1D2C',
    description: 'Direct and transitive software packages, third-party libraries, and modules.',
  },
  'Security Signal': {
    color: '#FBBF24',
    border: '#4D3B16',
    bg: '#241B0B',
    description: 'Telemetry alerts, anomaly heuristics, and outbound behavioral indicators.',
  },
  'Integrity Check': {
    color: '#34D399',
    border: '#184732',
    bg: '#0E2219',
    description: 'Cryptographic hash verifiers, lockfile invariants, and policy contracts.',
  },
  'External Service': {
    color: '#C084FC',
    border: '#412258',
    bg: '#1D122B',
    description: 'Public package registries, external webhook endpoints, and DNS authorities.',
  },
};

export const initialGraphNodes: GraphNode[] = [
  {
    id: 'APPLICATION_01',
    name: 'APPLICATION_01',
    category: 'Application',
    x: 370,
    y: 160,
    technicalRole: 'Primary Runtime Service',
    status: 'ACTIVE RUNTIME',
    description:
      'The core software process executing user logic, dispatching requests, and managing internal worker threads.',
    connections: [
      'TRUST_BOUNDARY',
      'DEPENDENCY_GRAPH',
      'INTEGRITY_CHECK',
      'EXTERNAL_ENDPOINT',
    ],
    attributes: [
      { label: 'RUNTIME', value: 'Isolated Process' },
      { label: 'INGRESS', value: 'Internal IPC / REST' },
      { label: 'INVARIANTS', value: 'Least Privilege Bounds' },
    ],
  },
  {
    id: 'TRUST_BOUNDARY',
    name: 'TRUST_BOUNDARY',
    category: 'Integrity Check',
    x: 170,
    y: 110,
    technicalRole: 'Perimeter Validation Invariant',
    status: 'ENFORCED',
    description:
      'Defines authorization boundaries between untrusted third-party inputs and privileged internal memory namespaces.',
    connections: ['APPLICATION_01', 'PACKAGE_REGISTRY'],
    attributes: [
      { label: 'POLICY', value: 'Zero-Implicit-Trust' },
      { label: 'FILTER', value: 'Input Sanitization' },
      { label: 'AUDIT LOG', value: 'Continuous Stream' },
    ],
  },
  {
    id: 'DEPENDENCY_GRAPH',
    name: 'DEPENDENCY_GRAPH',
    category: 'Dependency',
    x: 230,
    y: 260,
    technicalRole: 'Transitive Package Resolver',
    status: 'MAPPED',
    description:
      'A directed acyclic graph mapping declared direct packages and deep recursive children to evaluate vulnerability blast radius.',
    connections: [
      'APPLICATION_01',
      'PACKAGE_REGISTRY',
      'METADATA_EXTRACTOR',
      'INTEGRITY_CHECK',
    ],
    attributes: [
      { label: 'DEPTH', value: 'Recursive Level $\\ge 4$' },
      { label: 'PARSER', value: 'Lockfile & Manifest' },
      { label: 'CYCLE CHECK', value: 'Strict DAG Nominal' },
    ],
  },
  {
    id: 'INTEGRITY_CHECK',
    name: 'INTEGRITY_CHECK',
    category: 'Integrity Check',
    x: 510,
    y: 250,
    technicalRole: 'Cryptographic Hash Auditor',
    status: 'VERIFIED',
    description:
      'Validates SHA-256 checksums and digital signatures of downloaded artifacts against official vendor release receipts.',
    connections: [
      'APPLICATION_01',
      'DEPENDENCY_GRAPH',
      'CONTAINER_SANDBOX',
      'SECURITY_SIGNAL',
    ],
    attributes: [
      { label: 'HASH ALGO', value: 'SHA-256 / BLAKE3' },
      { label: 'PROVENANCE', value: 'Signed SLSA Receipt' },
      { label: 'TAMPER STATUS', value: 'Zero Delta Detected' },
    ],
  },
  {
    id: 'EXTERNAL_ENDPOINT',
    name: 'EXTERNAL_ENDPOINT',
    category: 'External Service',
    x: 580,
    y: 110,
    technicalRole: 'Third-Party Network Gateway',
    status: 'MONITORED',
    description:
      'External REST APIs and webhooks contacted by the system for telemetry sync, update queries, or authentication.',
    connections: ['APPLICATION_01', 'CONTAINER_SANDBOX'],
    attributes: [
      { label: 'PROTOCOL', value: 'mTLS / HTTPS' },
      { label: 'EGRESS RATE', value: 'Rate-Limited Window' },
      { label: 'DNS PROBE', value: 'Canonical Domain Match' },
    ],
  },
  {
    id: 'PACKAGE_REGISTRY',
    name: 'PACKAGE_REGISTRY',
    category: 'External Service',
    x: 100,
    y: 360,
    technicalRole: 'Upstream Repository Mirror',
    status: 'EXTERNAL SOURCE',
    description:
      'Public package indices (PyPI, npm, crates.io) hosting published tarballs and metadata releases.',
    connections: ['TRUST_BOUNDARY', 'DEPENDENCY_GRAPH'],
    attributes: [
      { label: 'ORIGIN', value: 'Public Artifact Mirror' },
      { label: 'GPG VERIFY', value: 'Maintainer Key Verified' },
      { label: 'INDEX STATE', value: 'Cached Snapshot' },
    ],
  },
  {
    id: 'METADATA_EXTRACTOR',
    name: 'METADATA_EXTRACTOR',
    category: 'Dependency',
    x: 230,
    y: 410,
    technicalRole: 'AST & Manifest Analyzer',
    status: 'PARSED',
    description:
      'Extracts lifecycle hooks, install scripts, and source abstract syntax trees to identify suspicious execution behaviors.',
    connections: ['DEPENDENCY_GRAPH', 'SECURITY_SIGNAL'],
    attributes: [
      { label: 'HOOK CHECK', value: 'setup.py / preinstall' },
      { label: 'ENTROPY', value: 'Calculated 0.41' },
      { label: 'AST SCOPE', value: 'Import Inspection' },
    ],
  },
  {
    id: 'SECURITY_SIGNAL',
    name: 'SECURITY_SIGNAL',
    category: 'Security Signal',
    x: 370,
    y: 350,
    technicalRole: 'Anomaly Observation Feed',
    status: 'ALERT LOGGING',
    description:
      'Aggregates anomaly heuristics, behavioral red flags, and supply-chain drift metrics into structured triage reports.',
    connections: [
      'INTEGRITY_CHECK',
      'METADATA_EXTRACTOR',
      'ANOMALY_HEURISTIC',
    ],
    attributes: [
      { label: 'ALERT LEVEL', value: 'Informational' },
      { label: 'CORRELATION', value: 'Multi-Signal Fusion' },
      { label: 'DISPATCH', value: 'Real-Time Telemetry' },
    ],
  },
  {
    id: 'ANOMALY_HEURISTIC',
    name: 'ANOMALY_HEURISTIC',
    category: 'Security Signal',
    x: 500,
    y: 390,
    technicalRole: 'Rule-Based Anomaly Classifier',
    status: 'EVALUATING',
    description:
      'Evaluates behavioral deviations, such as sudden author key rotations or unexpected socket invocations during builds.',
    connections: ['SECURITY_SIGNAL', 'CONTAINER_SANDBOX'],
    attributes: [
      { label: 'CLASSIFIER', value: 'Heuristic Rule Matrix' },
      { label: 'FALSE POSITIVE', value: 'Suppressed via Rules' },
      { label: 'OUTCOME', value: 'Triage Flag Generated' },
    ],
  },
  {
    id: 'CONTAINER_SANDBOX',
    name: 'CONTAINER_SANDBOX',
    category: 'Application',
    x: 620,
    y: 270,
    technicalRole: 'Isolated Build Environment',
    status: 'SANDBOXED',
    description:
      'Ephemeral container environment that executes build steps in a restricted network namespace without host filesystem access.',
    connections: [
      'INTEGRITY_CHECK',
      'EXTERNAL_ENDPOINT',
      'ANOMALY_HEURISTIC',
    ],
    attributes: [
      { label: 'ISOLATION', value: 'Namespaced Container' },
      { label: 'NETWORK', value: 'Egress Blocked by Default' },
      { label: 'LIFETIME', value: 'Single-Use Ephemeral' },
    ],
  },
];

export const graphEdges: GraphEdge[] = [
  { id: 'e-1', source: 'APPLICATION_01', target: 'TRUST_BOUNDARY' },
  { id: 'e-2', source: 'APPLICATION_01', target: 'DEPENDENCY_GRAPH' },
  { id: 'e-3', source: 'APPLICATION_01', target: 'INTEGRITY_CHECK' },
  { id: 'e-4', source: 'APPLICATION_01', target: 'EXTERNAL_ENDPOINT' },
  { id: 'e-5', source: 'DEPENDENCY_GRAPH', target: 'PACKAGE_REGISTRY' },
  { id: 'e-6', source: 'DEPENDENCY_GRAPH', target: 'METADATA_EXTRACTOR' },
  { id: 'e-7', source: 'DEPENDENCY_GRAPH', target: 'INTEGRITY_CHECK' },
  { id: 'e-8', source: 'INTEGRITY_CHECK', target: 'CONTAINER_SANDBOX' },
  { id: 'e-9', source: 'INTEGRITY_CHECK', target: 'SECURITY_SIGNAL' },
  { id: 'e-10', source: 'SECURITY_SIGNAL', target: 'METADATA_EXTRACTOR' },
  { id: 'e-11', source: 'SECURITY_SIGNAL', target: 'ANOMALY_HEURISTIC' },
  { id: 'e-12', source: 'TRUST_BOUNDARY', target: 'PACKAGE_REGISTRY' },
  { id: 'e-13', source: 'EXTERNAL_ENDPOINT', target: 'CONTAINER_SANDBOX' },
  { id: 'e-14', source: 'CONTAINER_SANDBOX', target: 'ANOMALY_HEURISTIC' },
];
