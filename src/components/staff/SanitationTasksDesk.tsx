import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Play, AlertTriangle, MapPin, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SanitationTasksDesk: React.FC = () => {
  const { operationalTasks, updateOperationalTaskStatus, currentStaffUser } = useApp();

  const sanitationTasks = operationalTasks.filter(t => t.category === 'sanitation');

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-navy-200/80 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Facility Hygiene & Biohazard Desk
          </span>
          <h2 className="text-2xl font-black text-navy-950 mt-0.5">Sanitation & Disinfection Tasks</h2>
          <p className="text-xs text-navy-500">
            Sanitation Lead: {currentStaffUser.name} • Badge ID: {currentStaffUser.badgeId}
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-200 px-3.5 py-2 rounded-2xl text-xs">
          <span className="font-extrabold text-teal-900">
            {sanitationTasks.filter(t => t.status !== 'completed').length} Tasks Pending
          </span>
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {sanitationTasks.map((task) => {
          const isPending = task.status === 'pending';
          const isInProgress = task.status === 'in_progress';
          const isCompleted = task.status === 'completed';

          return (
            <div
              key={task.id}
              className={`p-5 rounded-3xl border transition-all ${
                isInProgress 
                  ? 'bg-teal-50/70 border-teal-400 ring-2 ring-teal-400/20 shadow-soft-sm'
                  : isCompleted
                  ? 'bg-slate-50 border-slate-200 opacity-75'
                  : 'bg-white border-navy-200/80 shadow-soft-xs'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-navy-950 text-sm">{task.title}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      task.priority === 'urgent' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-navy-600">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{task.location}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Logged at {task.createdAt}</span>
                  </div>

                  {task.notes && (
                    <p className="text-xs text-navy-700 bg-white/80 p-2 rounded-xl border border-navy-100 mt-2">
                      {task.notes}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 shrink-0">
                  {isPending && (
                    <button
                      onClick={() => updateOperationalTaskStatus(task.id, 'in_progress')}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Cleaning</span>
                    </button>
                  )}

                  {isInProgress && (
                    <button
                      onClick={() => updateOperationalTaskStatus(task.id, 'completed', 'Sanitized with sodium hypochlorite. Safety cones removed.')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-soft-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Sanitation Complete</span>
                    </button>
                  )}

                  {isCompleted && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Completed at {task.completedAt}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
