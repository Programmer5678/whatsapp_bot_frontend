import { Job } from '../types';
export interface TreeNode {
  name: string;
  fullPath: string;
  children: Record<string, TreeNode>;
  isJob: boolean;
  isBatch: boolean;
  jobData?: Job;
  batchId?: string;
}

/**
 * buildJobTree
 *
 * Parses flat job list into hierarchical tree structure.
 * Job IDs are slash-delimited paths (e.g., "mavdaks/2025-12-30/job/1").
 *
 * Algorithm:
 * 1. Split each job ID by "/"
 * 2. Create nested objects for each path segment
 * 3. Mark nodes as batch or job based on batch_id and job_id
 * 4. Store full job data at leaf nodes
 *
 * @param jobs - Array of job objects from API
 * @returns Tree structure with nested nodes
 */
export function buildJobTree(jobs: Job[]): Record<string, TreeNode> {
  const root: Record<string, TreeNode> = {};
  const batchIds = new Set(jobs.map(j => j.batch_id));
  const jobIds = new Set(jobs.map(j => j.job_id));
  jobs.forEach(job => {
    const parts = job.id.split('/');
    let currentLevel = root;
    let currentPath = '';
    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      if (!currentLevel[part]) {
        currentLevel[part] = {
          name: part,
          fullPath: currentPath,
          children: {},
          isJob: false,
          isBatch: false
        };
      }
      if (batchIds.has(currentPath)) {
        currentLevel[part].isBatch = true;
        currentLevel[part].batchId = currentPath;
      }
      if (jobIds.has(currentPath) && index === parts.length - 1) {
        currentLevel[part].isJob = true;
        currentLevel[part].jobData = job;
      }
      currentLevel = currentLevel[part].children;
    });
  });
  return root;
}