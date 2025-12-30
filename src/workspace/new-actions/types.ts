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