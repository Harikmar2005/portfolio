/**
 * Centralized configuration for Hari Kumar's Portfolio.
 * Verified details and exact 4 projects:
 * 1. ChainProof — Software Supply-Chain Security
 * 2. OfferGuard — Offer Verification and Trust
 * 3. Campus Flow — Campus Workflow Management
 * 4. Vallam — Project Showcase (Editable placeholders)
 */

export interface ProjectData {
  id: string;
  number: string;
  name: string;
  category: string;
  isEditable?: boolean;
  description: string;
  detailedAnalysis: {
    problemStatement: string;
    methodology: string;
    keyComponents: string[];
    technicalConsiderations: string[];
    statusNote: string;
  };
  verifiedTags: string[];
  repoUrl: string;
  demoUrl?: string;
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    context: string;
    verifiedIn?: string[];
  }[];
}

export interface EditableProfileData {
  name: string;
  role: string;
  institution: string;
  education: string;
  graduationBatch: string;
  cgpa: string;
  email: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  headline: string;
  supportingText: string;
  interests: string[];
}

export const profileData: EditableProfileData = {
  name: 'Hari Kumar',
  role: 'Cybersecurity Developer & Engineering Student',
  institution: 'Sri Sairam Institute of Technology',
  education: 'B.E. in Computer Science and Engineering (Cybersecurity)',
  graduationBatch: '2028',
  cgpa: '7.79 / 10',
  email: 'elangoharikumar@gmail.com',
  githubUsername: 'Harikmar2005',
  githubUrl: 'https://github.com/Harikmar2005',
  linkedinUrl: 'https://linkedin.com/in/placeholder-harikumar', // Editable placeholder
  headline: 'I BUILD SYSTEMS THAT DETECT, VERIFY & DEFEND.',
  supportingText:
    'Cybersecurity, software engineering, and intelligent systems — built through experimentation, practical projects, and continuous learning.',
  interests: [
    'Cybersecurity',
    'Software Engineering',
    'Intelligent Systems',
    'Backend Development',
  ],
};

export const projectsData: ProjectData[] = [
  {
    id: 'chainproof',
    number: '01',
    name: 'ChainProof',
    category: 'Software Supply-Chain Security',
    description:
      'A security-focused project designed to investigate software component integrity, dependency risks, vulnerability information, and software trust.',
    verifiedTags: ['Dependency Security', 'Component Integrity', 'Software Trust', 'Supply Chain'],
    repoUrl: 'https://github.com/Harikmar2005/Chainproof',
    detailedAnalysis: {
      problemStatement:
        'Modern application ecosystems rely heavily on third-party libraries and transitive dependencies, making component integrity and supply-chain trust critical attack surfaces.',
      methodology:
        'Explores dependency graph analysis to inspect package origins, identify suspicious scripts or lifecycle hooks, and evaluate trust heuristics across the software supply chain.',
      keyComponents: [
        'Dependency Tree Analysis & Path Mapping',
        'Component Integrity & Risk Evaluation',
        'Vulnerability Association & Advisory Cross-Referencing',
        'Graph-Based Transitive Dependency Inspection',
      ],
      technicalConsiderations: [
        'Accurately identifying risk indicators without producing high rates of false alarms',
        'Tracking deep transitive relationships where parent packages disguise child vulnerabilities',
      ],
      statusNote: 'Active repository. Focused on dependency security research and component integrity verification.',
    },
  },
  {
    id: 'offer-guard',
    number: '02',
    name: 'OfferGuard',
    category: 'Offer Verification and Trust',
    description:
      'A project focused on helping users assess and verify offers using relevant evidence and trust signals.',
    verifiedTags: ['Trust Verification', 'Evidence Analysis', 'Signal Review', 'Workflow Security'],
    repoUrl: 'https://github.com/Harikmar2005/offer-guard',
    detailedAnalysis: {
      problemStatement:
        'Early-career professionals and students frequently encounter questionable internship, employment, or academic solicitations that require objective evidence verification.',
      methodology:
        'Structures a multi-signal review workflow that examines communication channels, domain authentications, digital identifiers, and inconsistency markers.',
      keyComponents: [
        'Structured Evidence Inspection Checklist',
        'Domain & Communication Signal Review',
        'Indicator Assessment & Red-Flag Logging',
        'Step-by-Step Trust Verification Workflow',
      ],
      technicalConsiderations: [
        'Providing clear evidence breakdowns rather than making unsubstantiated guarantees',
        'Handling subtle inconsistencies between claimed organizations and actual delivery channels',
      ],
      statusNote: 'Active repository. Verification workflow designed to systematically evaluate offer credibility.',
    },
  },
  {
    id: 'campus-flow',
    number: '03',
    name: 'Campus Flow',
    category: 'Campus Workflow Management',
    description:
      'A project exploring how campus-related workflows and information can be organized through a digital platform.',
    verifiedTags: ['Workflow Management', 'Information Architecture', 'Task Tracking', 'Campus Systems'],
    repoUrl: 'https://github.com/Harikmar2005/campus-flow',
    detailedAnalysis: {
      problemStatement:
        'Campus operations, academic schedules, student tasks, and administrative communication often suffer from fragmented channels and uncoordinated updates.',
      methodology:
        'Designs an integrated workflow interface unifying student event calendars, task timelines, departmental updates, and actionable academic notices.',
      keyComponents: [
        'Centralized Workflow Timeline & Milestones',
        'Task Progression & Categorized Status Tracking',
        'Structured Information Architecture for Departments',
        'Clean Interactive Dashboard for Campus Schedules',
      ],
      technicalConsiderations: [
        'Maintaining an intuitive, low-latency UI that students can navigate quickly on mobile and desktop',
        'Structuring data models for recurring campus events and deadline tracking',
      ],
      statusNote: 'Active repository. Focused on clean campus information management and streamlined student workflows.',
    },
  },
  {
    id: 'vallam',
    number: '04',
    name: 'Vallam',
    category: 'Farmer Support Navigator',
    description:
      'A bilingual farmer-support navigator for discovering agricultural schemes and checking eligibility using explainable rule-based matching.',
    verifiedTags: ['React', 'TypeScript', 'FastAPI', 'Rule-Based Matching'],
    repoUrl: 'https://github.com/Harikmar2005/valam',
    detailedAnalysis: {
      problemStatement:
        'Navigating governmental and regional agricultural assistance schemes is difficult for farmers due to fragmented qualification criteria and language barriers.',
      methodology:
        'Implements an explainable rule-based matching system that parses applicant criteria, validates document readiness, and provides personalized step-by-step pathways.',
      keyComponents: [
        'Bilingual Scheme Discovery Interface',
        'Explainable Rule-Based Eligibility Matching Engine',
        'Document-Readiness Verification Checkpoints',
        'Step-by-Step Support Pathway Generator',
      ],
      technicalConsiderations: [
        'Ensuring high accessibility and low-latency rendering across mobile devices in varying connectivity environments',
        'Transparent decision rules explaining eligibility without ambiguous scoring',
      ],
      statusNote:
        'Active repository. Built with React, TypeScript, and FastAPI for community farmer assistance.',
    },
  },
];

export const workbenchSkills: SkillCategory[] = [
  {
    category: 'Programming Languages',
    items: [
      { name: 'Python', context: 'Scripting, dependency analysis, network sockets, backend logic' },
      { name: 'C / C++', context: 'Low-level systems programming, memory safety principles, computer science foundations' },
      { name: 'JavaScript / TypeScript', context: 'Interactive web workstations, user interfaces, frontend applications' },
      { name: 'SQL', context: 'Relational data modeling, querying, database schemas' },
      { name: 'Bash / Shell', context: 'Linux automation, environment management, command-line utilities' },
    ],
  },
  {
    category: 'Cybersecurity Tools',
    items: [
      { name: 'Software Supply-Chain Auditing', context: 'Dependency graph inspection, lockfile auditing, component trust analysis' },
      { name: 'Network Telemetry & Analysis', context: 'Packet inspection, socket communication, flow monitoring' },
      { name: 'Static Code Analysis (SAST)', context: 'Vulnerability pattern identification, source code review' },
      { name: 'Threat Modeling & Risk Analysis', context: 'Attack surface mapping, trust boundaries, evidence verification' },
      { name: 'Cryptographic Foundations', context: 'Hashing, integrity checks, digital signatures, public key infrastructure' },
    ],
  },
  {
    category: 'Backend Development',
    items: [
      { name: 'RESTful API Architecture', context: 'Structured endpoint design, request validation, HTTP methods' },
      { name: 'FastAPI / Python Web Frameworks', context: 'Lightweight asynchronous APIs, data modeling' },
      { name: 'Node.js / Express Basics', context: 'Event-driven server architecture, routing, middleware' },
      { name: 'Workflow Engines & Logic', context: 'Task state transitions, structured review pipelines' },
    ],
  },
  {
    category: 'Machine Learning',
    items: [
      { name: 'scikit-learn Foundations', context: 'Classification algorithms, anomaly detection concepts, feature pipelines' },
      { name: 'Data Preprocessing & Evaluation', context: 'Feature extraction, normalization, heuristic modeling' },
      { name: 'Heuristic & Rule-Based Models', context: 'Transparent decision rules, interpretability for security triage' },
    ],
  },
  {
    category: 'Databases & Developer Tools',
    items: [
      { name: 'Git & GitHub', context: 'Version control, branch management, public code collaboration' },
      { name: 'Linux / Unix Environments', context: 'Daily workstation OS, process inspection, filesystem permissions' },
      { name: 'PostgreSQL / SQLite', context: 'Structured relational data storage, migrations, integrity constraints' },
      { name: 'Docker Fundamentals', context: 'Isolated application containers, reproducible developer environments' },
      { name: 'VS Code & Developer Tooling', context: 'Debugging, linting, extensions, terminal integration' },
    ],
  },
];
