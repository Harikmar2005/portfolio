import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Layers, ArrowRight, UserCheck, Bell } from 'lucide-react';

interface WorkflowTask {
  id: string;
  title: string;
  category: 'Academics' | 'Events' | 'Administration' | 'Lab Access';
  status: 'Completed' | 'In Progress' | 'Upcoming';
  timeline: string;
  assignee: string;
  notes: string;
}

export const CampusFlowVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Academics' | 'Administration'>('All');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('task-2');

  const tasks: WorkflowTask[] = [
    {
      id: 'task-1',
      title: 'Lab Security Clearance & Access Key Provisioning',
      category: 'Lab Access',
      status: 'Completed',
      timeline: 'Phase 1 · Week 01',
      assignee: 'Cybersecurity Dept',
      notes: 'Hardware terminal credentials generated and synced with lab entry manifest.',
    },
    {
      id: 'task-2',
      title: 'Semester Elective Enrollment & Prerequisite Check',
      category: 'Academics',
      status: 'In Progress',
      timeline: 'Phase 2 · Active Now',
      assignee: 'Academic Portal',
      notes: 'Automated prerequisite validation for Advanced Computer Networks & Systems.',
    },
    {
      id: 'task-3',
      title: 'Annual Symposium Project Submission & Review Workflow',
      category: 'Events',
      status: 'Upcoming',
      timeline: 'Phase 3 · Next Week',
      assignee: 'Review Committee',
      notes: 'Structured multi-stage submission queue with reviewer feedback checkpoints.',
    },
    {
      id: 'task-4',
      title: 'Departmental Resource Allocation & Schedule Alignment',
      category: 'Administration',
      status: 'Upcoming',
      timeline: 'Phase 4 · Scheduled',
      assignee: 'Admin Coordinator',
      notes: 'Consolidated timetable matrix avoiding room and faculty overlap.',
    },
  ];

  const filteredTasks = activeTab === 'All' ? tasks : tasks.filter((t) => t.category === activeTab || (activeTab === 'Academics' && t.category === 'Lab Access'));
  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || tasks[1];

  return (
    <div className="w-full border border-[#252B33] bg-[#0B0E12] p-4 flex flex-col gap-3 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#252B33] pb-2 text-xs text-[#929BA7]">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-[#B7FF5A]" />
          <span className="text-[#F3F5F7] font-semibold">CAMPUS_FLOW // WORKFLOW_ENGINE</span>
          <span>·</span>
          <span className="text-[#B7FF5A]">ORGANIZED PIPELINE</span>
        </div>
        <span className="text-[10px] text-[#6A7482]">PLATFORM PROTOTYPE</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] text-[#6A7482]">WORKFLOW PIPELINE:</span>
        <div className="flex items-center gap-1 bg-[#11151A] p-0.5 border border-[#252B33]">
          {(['All', 'Academics', 'Administration'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-0.5 text-[10px] transition-colors ${
                activeTab === tab
                  ? 'bg-[#1C232D] text-[#B7FF5A] font-semibold'
                  : 'text-[#6A7482] hover:text-[#929BA7]'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Workflow Timeline Cards */}
      <div className="space-y-2 border border-[#1D232B] bg-[#0E1217] p-3 max-h-[190px] overflow-y-auto">
        {filteredTasks.map((task) => {
          const isSelected = selectedTaskId === task.id;
          const isDone = task.status === 'Completed';
          const isInProgress = task.status === 'In Progress';

          return (
            <div
              key={task.id}
              onClick={() => setSelectedTaskId(task.id)}
              className={`p-2.5 border text-xs cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#B7FF5A] bg-[#121915]'
                  : 'border-[#252B33] bg-[#11151A] hover:border-[#353D47]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#6A7482]">{task.timeline}</span>
                  <span className="text-[#F3F5F7] font-semibold truncate">{task.title}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[9px] px-1.5 py-0.2 border ${
                      isDone
                        ? 'text-[#B7FF5A] border-[#2E4A28] bg-[#121E14]'
                        : isInProgress
                        ? 'text-sky-300 border-sky-900 bg-sky-950/40'
                        : 'text-[#929BA7] border-[#252B33] bg-[#151A21]'
                    }`}
                  >
                    {task.status.toUpperCase()}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-3 h-3 text-[#B7FF5A]" />
                  ) : isInProgress ? (
                    <Clock className="w-3 h-3 text-sky-400" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full border border-[#6A7482]" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#929BA7] pl-1">
                <span>Domain: {task.category}</span>
                <span className="text-[#6A7482]">Target: {task.assignee}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Task Inspection Pane */}
      <div className="border border-[#252B33] bg-[#11151A] p-2.5 text-xs">
        <div className="flex items-center justify-between text-[11px] border-b border-[#252B33] pb-1 mb-1.5">
          <span className="text-[#F3F5F7] font-semibold">{selectedTask.title}</span>
          <span className="text-[#B7FF5A] text-[10px]">{selectedTask.timeline}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#929BA7]">
          <div>
            <span className="text-[#6A7482] text-[10px] block">CATEGORY & DISPATCH</span>
            <span className="text-[#F3F5F7]">{selectedTask.category} · {selectedTask.assignee}</span>
          </div>
          <div>
            <span className="text-[#6A7482] text-[10px] block">WORKFLOW STATE</span>
            <span className="text-[#D8DEE9]">{selectedTask.notes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
