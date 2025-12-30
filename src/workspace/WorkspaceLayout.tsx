import React, { useEffect, useState, Component } from 'react';
import { PlusCircle, ListTodo, RefreshCw } from 'lucide-react';
import { JobTree } from './current-jobs/JobTree';
import { NewActionForm } from './new-actions/NewActionForm';
import { api } from '../shared/api/client';
import { buildJobTree, TreeNode } from './current-jobs/utils/jobTree';
import { Button } from '../shared/ui/Button';
import { cn } from '../shared/utils/helpers';
type Tab = 'new_actions' | 'current_jobs';
/**
 * WorkspaceLayout Component
 *
 * Main workspace area containing tabbed interface for:
 * - New Actions: Create new automation actions
 * - Current Jobs: Monitor and manage running jobs
 *
 * This component handles:
 * - Tab switching
 * - Job fetching and refresh
 * - Layout and composition of workspace features
 */
export function WorkspaceLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('new_actions');
  const [jobTree, setJobTree] = useState<Record<string, TreeNode>>({});
  const [loadingJobs, setLoadingJobs] = useState(false);
  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const response = await api.getAllJobs();
      const tree = buildJobTree(response.jobs || []);
      setJobTree(tree);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoadingJobs(false);
    }
  };
  useEffect(() => {
    if (activeTab === 'current_jobs') {
      fetchJobs();
    }
  }, [activeTab]);
  return <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8 space-y-8">
      <div className="flex flex-col gap-6">
        {/* Tab Navigation */}
        <div className="flex items-center justify-center p-1 bg-slate-200/50 rounded-lg self-center">
          <button onClick={() => setActiveTab('new_actions')} className={cn('flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200', activeTab === 'new_actions' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
            <PlusCircle className="h-4 w-4" />
            New Actions
          </button>
          <button onClick={() => setActiveTab('current_jobs')} className={cn('flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200', activeTab === 'current_jobs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
            <ListTodo className="h-4 w-4" />
            Current Jobs
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[500px] p-6">
          {activeTab === 'new_actions' ? <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Create New Action
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Select an action type to configure and launch automation.
                </p>
              </div>
              <NewActionForm />
            </div> : <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Current Jobs
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Monitor and manage running automation tasks.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchJobs} disabled={loadingJobs} className="gap-2">
                  <RefreshCw className={cn('h-4 w-4', loadingJobs && 'animate-spin')} />
                  Refresh List
                </Button>
              </div>

              <div className="flex-1 overflow-auto pr-2">
                {loadingJobs && Object.keys(jobTree).length === 0 ? <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <RefreshCw className="h-8 w-8 animate-spin mb-2" />
                    <p>Loading jobs...</p>
                  </div> : Object.keys(jobTree).length === 0 ? <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
                    <ListTodo className="h-8 w-8 mb-2 opacity-50" />
                    <p>No active jobs found</p>
                  </div> : <JobTree nodes={jobTree} onRefresh={fetchJobs} />}
              </div>
            </div>}
        </div>
      </div>
    </main>;
}