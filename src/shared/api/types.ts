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

/**
 * New Actions-specific types
 * Types used only within the new-actions feature
 */

export interface BaseGroupRequestModel {
  date: string;
  deadline: string;
  group_participants: string[];
}
export interface Raf0RequestModel {
  date: string;
  group_participants: string[];
}
export interface MavdakRequestModel {
  base_date: string;
  deadline_mavdak_list: string;
  forms_link: string;
  iluzei_reaionot_mador_mavdak: string;
  group_participants: string[];
}
export interface HakhanaRequestModel extends BaseGroupRequestModel {}
export interface VeadatKevaRequestModel extends BaseGroupRequestModel {}

/**
 * Header-specific types
 * Types used only within the header section
 */

export type ConnectionStatusType = 'connected' | 'not_connected' | 'evolution_connection_error';
export interface ConnectionStateResponse {
  status: ConnectionStatusType;
  last_run?: string;
}