import React, { useState } from 'react';
import { UserCheck, Clock, CheckCircle2, Play, AlertTriangle, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OperationalTask } from '../../types';

export const AttendantTasksDesk: React.FC = () => {
  const { operationalTasks, updateOperationalTaskStatus, currentStaffUser } = useApp();

  const attendantTasks = operationalTasks.filter(t => t.category === 'transport');

  const handleStartTask = (taskId: string) => {
    updateOperationalTaskStatus(taskId, 'in_progress');
  };

  const handleCompleteTask = (taskId: string) => {
    updateOperationalTaskStatus(taskId, 'completed');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-navy-200/80 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Patient Mobility & Escort Desk
          </span>
          <h2 className="text-2xl font-black text-navy-950 mt-0.5">Patient Transport Tasks</h2>
          <p className="text-xs text-navy-500">
            Assigned Attendant: {currentStaffUser.name} • Badge ID: {currentStaffUser.badgeId}
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-3.5 py-2 rounded-2xl text-xs">
          <span className="font-extrabold text-indigo-900">
            {attendantTasks.filter(t => t.status !== 'completed').length} Active Transport Tasks
          </span>
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {attendantTasks.map((task) => {
          const isPending = task.status === 'pending';
          const isInProgress = task.status === 'in_progress';
          const isCompleted = task.status === 'completed';

          return (
            <div
              key={task.id}
              className={`p-5 rounded-3xl border transition-all ${
                isInProgress 
                  ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-400/20 shadow-soft-sm'
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
                      task.priority === 'stat' ? 'bg-rose-100 text-rose-800' : task.priority === 'urgent' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-navy-600">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{task.location}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Assigned at {task.createdAt}</span>
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
                      onClick={() => handleStartTask(task.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Accept & Start</span>
                    </button>
                  )}

                  {isInProgress && (
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-soft-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Transport Completed</span>
                    </button>
                  )}

                  {isCompleted && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Delivered at {task.completedAt}</span>
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
