import React, { useState, Children, Component } from 'react';
import { ChevronRight, ChevronDown, Trash2, Clock, AlertTriangle } from 'lucide-react';
import { TreeNode } from './utils/jobTree';
import { Job } from './types';
import { Button } from '../../shared/ui/Button';
import { Badge } from './ui/Badge';
import { cn, formatDate } from '../../shared/utils/helpers';
import { api } from '../../shared/api/client';
interface JobTreeProps {
  nodes: Record<string, TreeNode>;
  onRefresh: () => void;
}
/**
 * JobTree Component
 *
 * Displays a hierarchical tree view of automation jobs.
 * Jobs are organized by their ID path (e.g., "mavdaks/2025-12-30/job/1").
 *
 * Features:
 * - Recursive tree rendering
 * - Expand/collapse nodes
 * - Delete batch or individual jobs
 * - View detailed job information
 * - Status badges (PENDING, COMPLETED, FAILED, RUNNING)
 */
export function JobTree({
  nodes,
  onRefresh
}: JobTreeProps) {
  return <div className="space-y-1 pl-2">
      {Object.values(nodes).map(node => <TreeNodeItem key={node.fullPath} node={node} onRefresh={onRefresh} />)}
    </div>;
}
function TreeNodeItem({
  node,
  onRefresh
}: {
  node: TreeNode;
  onRefresh: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const hasChildren = Object.keys(node.children).length > 0;
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete ${node.name}?`)) return;
    setIsDeleting(true);
    try {
      if (node.isBatch && node.batchId) {
        await api.deleteJobBatch(node.batchId);
      } else if (node.isJob && node.jobData) {
        await api.deleteJob(node.jobData.job_id);
      }
      onRefresh();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'FAILED':
        return 'destructive';
      case 'RUNNING':
        return 'default';
      default:
        return 'secondary';
    }
  };
  return <div className="border-l border-slate-200 ml-2">
      <div className={cn('group flex items-center gap-2 py-2 px-2 hover:bg-slate-50 rounded-md cursor-pointer transition-colors', node.isJob && 'bg-slate-50/50')} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex-1 flex items-center gap-2 overflow-hidden">
          {hasChildren ? isOpen ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" /> : <div className="w-4" />}

          <span className={cn('text-sm truncate', node.isJob ? 'font-medium text-slate-900' : 'text-slate-600')}>
            {node.name}
          </span>

          {node.isJob && node.jobData && <Badge variant={getStatusColor(node.jobData.status)} className="ml-2 text-[10px] h-5">
              {node.jobData.status}
            </Badge>}
        </div>

        {(node.isBatch || node.isJob) && <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleDelete} disabled={isDeleting}>
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
          </Button>}
      </div>

      {isOpen && <div className="animate-in slide-in-from-top-2 duration-200">
          {node.isJob && node.jobData && <JobDetails job={node.jobData} />}

          {hasChildren && <div className="ml-2">
              <JobTree nodes={node.children} onRefresh={onRefresh} />
            </div>}
        </div>}
    </div>;
}
/**
 * JobDetails Component
 *
 * Displays detailed information about a specific job.
 * Shows description, timing, status, and any issues/exceptions.
 *
 * Features:
 * - Expandable error messages
 * - Formatted timestamps
 * - Job and batch ID badges
 */
function JobDetails({
  job
}: {
  job: Job;
}) {
  const [showFullError, setShowFullError] = useState(false);
  return <div className="ml-8 mb-4 p-4 bg-white border border-slate-200 rounded-md shadow-sm text-sm space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Description
          </label>
          <p className="text-slate-900 mt-1">{job.description}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Timing
          </label>
          <div className="space-y-1 mt-1">
            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="h-3.5 w-3.5" />
              <span>Created: {formatDate(job.created_at)}</span>
            </div>
            {job.next_run_time && <div className="flex items-center gap-2 text-slate-600">
                <Clock className="h-3.5 w-3.5 text-blue-500" />
                <span>Next Run: {formatDate(job.next_run_time)}</span>
              </div>}
          </div>
        </div>
      </div>

      {(job.issues || job.exception) && <div className="bg-red-50 p-3 rounded-md border border-red-100 cursor-pointer hover:bg-red-100 transition-colors" onClick={() => setShowFullError(!showFullError)}>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-red-900 text-xs uppercase tracking-wider mb-1">
                Issues & Exceptions
              </h4>
              <p className={cn('text-red-800 font-mono text-xs break-all', !showFullError && 'line-clamp-2')}>
                {job.exception || job.issues}
              </p>
              {!showFullError && <span className="text-xs text-red-500 mt-1 block">
                  Click to expand
                </span>}
            </div>
          </div>
        </div>}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
        <Badge variant="outline" className="text-xs font-normal text-slate-500">
          ID: {job.job_id}
        </Badge>
        <Badge variant="outline" className="text-xs font-normal text-slate-500">
          Batch: {job.batch_id}
        </Badge>
      </div>
    </div>;
}