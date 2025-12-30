import React, { useEffect, useState } from 'react';
import { PlusCircle, ListTodo, RefreshCw } from 'lucide-react';
import { JobTree } from './current-jobs/JobTree';
import { NewActionForm } from './new-actions/NewActionForm';
import { api } from '../shared/api/client';
import { buildJobTree, TreeNode } from './current-jobs/utils/jobTree';
import { Button } from '../shared/ui/Button';
import './WorkspaceLayout.css';
type Tab = 'new_actions' | 'current_jobs';
const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds
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
      const interval = setInterval(fetchJobs, AUTO_REFRESH_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [activeTab]);
  return <main className="workspace">
      <div className="workspace__container">
        <div className="workspace__tabs">
          <button onClick={() => setActiveTab('new_actions')} className={`workspace__tab ${activeTab === 'new_actions' ? 'workspace__tab--active' : ''}`}>
            <PlusCircle className="workspace__tab-icon" />
            New Actions
          </button>
          <button onClick={() => setActiveTab('current_jobs')} className={`workspace__tab ${activeTab === 'current_jobs' ? 'workspace__tab--active' : ''}`}>
            <ListTodo className="workspace__tab-icon" />
            Current Jobs
          </button>
        </div>

        <div className="workspace__content">
          {activeTab === 'new_actions' ? <div>
              <div className="workspace__header">
                <h2 className="workspace__title">Create New Action</h2>
                <p className="workspace__subtitle">
                  Select an action type to configure and launch automation.
                </p>
              </div>
              <NewActionForm />
            </div> : <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
              <div className="workspace__jobs-header">
                <div>
                  <h2 className="workspace__title">Current Jobs</h2>
                  <p className="workspace__subtitle">
                    Monitor and manage running automation tasks.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchJobs} disabled={loadingJobs}>
                  <RefreshCw size={16} className={loadingJobs ? 'button__icon--spinning' : ''} style={{
                marginRight: '0.5rem'
              }} />
                  Refresh List
                </Button>
              </div>

              <div className="workspace__jobs-content">
                {loadingJobs && Object.keys(jobTree).length === 0 ? <div className="workspace__loading">
                    <RefreshCw className="workspace__loading-icon button__icon--spinning" />
                    <p>Loading jobs...</p>
                  </div> : Object.keys(jobTree).length === 0 ? <div className="workspace__empty">
                    <div className="workspace__empty-container">
                      <ListTodo className="workspace__empty-icon" />
                      <p>No active jobs found</p>
                    </div>
                  </div> : <JobTree nodes={jobTree} onRefresh={fetchJobs} />}
              </div>
            </div>}
        </div>
      </div>
    </main>;
}