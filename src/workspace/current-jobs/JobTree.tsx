import React, { useState, Children } from 'react';
import { ChevronRight, ChevronDown, Trash2, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { TreeNode } from './utils/jobTree';
import { Job } from './types';
import { Button } from '../../shared/ui/Button';
import { Badge } from './ui/Badge';
import { formatDate } from '../../shared/utils/helpers';
import { api } from '../../shared/api/client';
import './JobTree.css';
interface JobTreeProps {
  nodes: Record<string, TreeNode>;
  onRefresh: () => void;
}
export function JobTree({
  nodes,
  onRefresh
}: JobTreeProps) {
  return <div className="job-tree">
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
  const getStatusColor = (status: string): 'warning' | 'success' | 'destructive' | 'default' | 'secondary' => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'warning';
      case 'COMPLETED':
      case 'SUCCESS':
        return 'success';
      case 'FAILED':
      case 'FAILURE':
        return 'destructive';
      case 'RUNNING':
        return 'default';
      default:
        return 'secondary';
    }
  };
  return <div className="job-tree__node">
      <div className={`job-tree__item ${node.isJob ? 'job-tree__item--job' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="job-tree__content">
          {hasChildren ? isOpen ? <ChevronDown className="job-tree__icon" /> : <ChevronRight className="job-tree__icon" /> : <div style={{
          width: '1rem'
        }} />}

          <span className={`job-tree__name ${node.isJob ? 'job-tree__name--job' : 'job-tree__name--directory'}`}>
            {node.name}
          </span>

          {node.isJob && node.jobData && <Badge variant={getStatusColor(node.jobData.status)} style={{
          marginLeft: '0.5rem',
          fontSize: '0.625rem',
          height: '1.25rem'
        }}>
              {node.jobData.status}
            </Badge>}
        </div>

        {(node.isBatch || node.isJob) && <Button variant="ghost" size="icon" className="job-tree__delete" onClick={handleDelete} disabled={isDeleting} style={{
        width: '1.5rem',
        height: '1.5rem'
      }}>
            <Trash2 size={14} style={{
          color: 'var(--error)'
        }} />
          </Button>}
      </div>

      {isOpen && <div className="job-tree__children">
          {node.isJob && node.jobData && <JobDetails job={node.jobData} />}

          {hasChildren && <div style={{
        marginLeft: '0.5rem'
      }}>
              <JobTree nodes={node.children} onRefresh={onRefresh} />
            </div>}
        </div>}
    </div>;
}
function JobDetails({
  job
}: {
  job: Job;
}) {
  const [showFullException, setShowFullException] = useState(false);
  return <div className="job-details">
      <div className="job-details__grid">
        <div className="job-details__field">
          <label className="job-details__label">Description</label>
          <p className="job-details__value">{job.description}</p>
        </div>

        <div className="job-details__field">
          <label className="job-details__label">Timing</label>
          <div className="job-details__timing">
            <div className="job-details__time">
              <Clock className="job-details__time-icon" />
              <span>Created: {formatDate(job.created_at)}</span>
            </div>
            {job.next_run_time && <div className="job-details__time">
                <Clock className="job-details__time-icon job-details__time-icon--next" />
                <span>Next Run: {formatDate(job.next_run_time)}</span>
              </div>}
          </div>
        </div>
      </div>

      {job.issues && job.issues.length > 0 && <div className="job-details__issues">
          <div className="job-details__error-header">
            <AlertTriangle className="job-details__error-icon job-details__error-icon--warning" />
            <div className="job-details__error-content">
              <h4 className="job-details__error-title job-details__error-title--warning">
                Issues ({job.issues.length})
              </h4>
              {job.issues.map((issue, idx) => <div key={idx} className="job-details__issue-item">
                  {issue.info}
                </div>)}
            </div>
          </div>
        </div>}

      {job.exception && <div className="job-details__exception" onClick={() => setShowFullException(!showFullException)}>
          <div className="job-details__error-header">
            <XCircle className="job-details__error-icon job-details__error-icon--error" />
            <div className="job-details__error-content">
              <h4 className="job-details__error-title job-details__error-title--error">
                Exception
              </h4>
              <p className={`job-details__error-text job-details__error-text--error ${!showFullException ? 'job-details__error-text--truncated' : ''}`}>
                {job.exception}
              </p>
              {!showFullException && <span className="job-details__error-expand job-details__error-expand--error">
                  Click to expand
                </span>}
            </div>
          </div>
        </div>}

      <div className="job-details__badges">
        <Badge variant="outline" style={{
        fontSize: '0.75rem',
        fontWeight: 'normal',
        color: 'var(--text-tertiary)'
      }}>
          ID: {job.job_id}
        </Badge>
        <Badge variant="outline" style={{
        fontSize: '0.75rem',
        fontWeight: 'normal',
        color: 'var(--text-tertiary)'
      }}>
          Batch: {job.batch_id}
        </Badge>
      </div>
    </div>;
}