import React, { useState } from 'react';
import { 
  ProjectTask, 
  PurchaseChecklistItem, 
  ImplementationChecklistItem, 
  CurrencyCode 
} from '../types';
import { formatCurrency, convertCurrency } from '../utils/currencies';
import { 
  CheckSquare, 
  ShoppingCart, 
  ListTodo, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter,
  Trash2
} from 'lucide-react';

interface TasksAndChecklistsProps {
  tasks: ProjectTask[];
  purchaseChecklist: PurchaseChecklistItem[];
  implementationChecklist: ImplementationChecklistItem[];
  planCurrency: CurrencyCode;
  displayCurrency: CurrencyCode;
  onUpdateTask: (taskId: string, updates: Partial<ProjectTask>) => void;
  onUpdatePurchaseItem: (itemId: string, completed: boolean) => void;
  onUpdateImplementationItem: (itemId: string, completed: boolean) => void;
  onAddTask: (task: ProjectTask) => void;
  onDeleteTask?: (taskId: string) => void;
}

export const TasksAndChecklists: React.FC<TasksAndChecklistsProps> = ({
  tasks,
  purchaseChecklist,
  implementationChecklist,
  planCurrency,
  displayCurrency,
  onUpdateTask,
  onUpdatePurchaseItem,
  onUpdateImplementationItem,
  onAddTask,
  onDeleteTask,
}) => {
  const [subTab, setSubTab] = useState<'tasks' | 'purchase' | 'prelaunch'>('tasks');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // New task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [taskDependency, setTaskDependency] = useState('None');
  const [taskCost, setTaskCost] = useState(0);
  const [taskDeadline, setTaskDeadline] = useState('Week 1');
  const [taskOwner, setTaskOwner] = useState('Founder');

  const val = (num: number = 0) => {
    return convertCurrency(num, planCurrency, displayCurrency).convertedAmount;
  };

  const completedPurchaseCount = purchaseChecklist.filter((p) => p.completed).length;
  const completedImpCount = implementationChecklist.filter((i) => i.completed).length;
  const completedTaskCount = tasks.filter((t) => t.status === 'Completed').length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    onAddTask({
      id: `task-${Date.now()}`,
      title: taskTitle.trim(),
      priority: taskPriority,
      dependency: taskDependency.trim() || 'None',
      status: 'Pending',
      estimatedCost: Math.max(0, Number(taskCost) || 0),
      deadline: taskDeadline.trim() || 'TBD',
      owner: taskOwner.trim() || 'Founder',
    });

    setTaskTitle('');
    setTaskCost(0);
    setShowAddTaskModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-slate-700" />
            <span>Execution Controls & Checklists</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sections 26, 50, and 51: Operational task dependencies, procurement shopping list, and pre-launch compliance.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar w-full sm:w-auto">
          <button
            onClick={() => setSubTab('tasks')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap min-h-[38px] flex items-center cursor-pointer ${
              subTab === 'tasks' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tasks ({completedTaskCount}/{tasks.length})
          </button>
          <button
            onClick={() => setSubTab('purchase')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap min-h-[38px] flex items-center cursor-pointer ${
              subTab === 'purchase' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Shopping ({completedPurchaseCount}/{purchaseChecklist.length})
          </button>
          <button
            onClick={() => setSubTab('prelaunch')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap min-h-[38px] flex items-center cursor-pointer ${
              subTab === 'prelaunch' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pre-Launch ({completedImpCount}/{implementationChecklist.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Section 26 — Task Management Board */}
      {subTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Filter by operational dependency or assign ownership
            </span>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                    <th className="py-2.5 px-3 w-12 text-center">Status</th>
                    <th className="py-2.5 px-3 min-w-[200px]">Task Objective</th>
                    <th className="py-2.5 px-3 w-28">Priority</th>
                    <th className="py-2.5 px-3 w-36">Dependency</th>
                    <th className="py-2.5 px-3 w-28 text-right">Est. Cost</th>
                    <th className="py-2.5 px-3 w-28">Deadline</th>
                    <th className="py-2.5 px-3 w-28">Owner</th>
                    <th className="py-2.5 px-3 w-10 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 text-center">
                        <select
                          value={task.status}
                          onChange={(e) => onUpdateTask(task.id, { status: e.target.value as any })}
                          className={`text-[10px] font-bold py-1 px-1.5 rounded border ${
                            task.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : task.status === 'In Progress'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-3 px-3">
                        <div className={`font-semibold ${task.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {task.title}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          task.priority === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : task.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 text-[11px]">
                        {task.dependency}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">
                        {task.estimatedCost > 0 ? formatCurrency(val(task.estimatedCost), displayCurrency) : '—'}
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium text-[11px]">
                        {task.deadline}
                      </td>
                      <td className="py-3 px-3 text-slate-800 font-semibold text-[11px]">
                        {task.owner}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {onDeleteTask && (
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors"
                            title="Delete task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Section 50 — Purchase Shopping Checklist */}
      {subTab === 'purchase' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-900">Procurement Progress</div>
              <div className="text-[11px] text-slate-500">
                {completedPurchaseCount} of {purchaseChecklist.length} hardware assets secured
              </div>
            </div>
            <div className="w-32 bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-2.5 rounded-full transition-all"
                style={{
                  width: `${purchaseChecklist.length > 0 ? (completedPurchaseCount / purchaseChecklist.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                    <th className="py-2.5 px-3 w-10 text-center">Acquired</th>
                    <th className="py-2.5 px-3 min-w-[200px]">Item / Specification</th>
                    <th className="py-2.5 px-3 w-16 text-center">Qty</th>
                    <th className="py-2.5 px-3 w-28 text-right">Est. Price ({displayCurrency})</th>
                    <th className="py-2.5 px-3 w-28">Priority</th>
                    <th className="py-2.5 px-3 min-w-[180px]">Recommended Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {purchaseChecklist.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={(e) => onUpdatePurchaseItem(item.id, e.target.checked)}
                          className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <div className={`font-semibold ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {item.item}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {item.specification}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-bold">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">
                        {formatCurrency(val(item.estimatedPrice), displayCurrency)}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.priority === 'Critical'
                            ? 'bg-rose-100 text-rose-800'
                            : item.priority === 'Important'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 text-[11px]">
                        {item.recommendedSource}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Section 51 — Pre-Launch Implementation Checklist */}
      {subTab === 'prelaunch' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-900">Pre-Launch Readiness Score</div>
              <div className="text-[11px] text-slate-500">
                {completedImpCount} of {implementationChecklist.length} gates passed
              </div>
            </div>
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {Math.round((completedImpCount / Math.max(1, implementationChecklist.length)) * 100)}% Ready
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {implementationChecklist.map((item) => (
              <div
                key={item.id}
                onClick={() => onUpdateImplementationItem(item.id, !item.completed)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  item.completed
                    ? 'border-emerald-200 bg-emerald-50/40 text-slate-800'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    onUpdateImplementationItem(item.id, e.target.checked);
                  }}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer mt-0.5 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                  </div>
                  <div className={`text-xs font-medium mt-0.5 ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Add Project Execution Task
              </h3>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sign wholesale roaster bean agreement"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Deadline / Phase</label>
                  <input
                    type="text"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Dependency</label>
                  <input
                    type="text"
                    placeholder="e.g. Signed Lease"
                    value={taskDependency}
                    onChange={(e) => setTaskDependency(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Estimated Cost ({planCurrency})</label>
                  <input
                    type="number"
                    min="0"
                    value={taskCost}
                    onChange={(e) => setTaskCost(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Owner / Assignee</label>
                <input
                  type="text"
                  value={taskOwner}
                  onChange={(e) => setTaskOwner(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="py-1.5 px-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-1.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
