/**
 * Current Jobs-specific types
 */

export interface JobIssue {
  info: string;
}
export interface Job {
  id: string;
  description: string;
  status: string;
  job_id: string;
  batch_id: string;
  issues: JobIssue[] | null;
  exception: string | null;
  created_at: string;
  next_run_time?: string;
  trigger?: string;
  start_date?: string;
  end_date?: string;
}
export interface JobTreeResponse {
  jobs: Job[];
}