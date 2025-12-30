/**
 * Header-specific types
 * Types used only within the header section
 */

export type ConnectionStatus = 'connected' | 'not_connected' | 'evolution_connection_error';
export interface ConnectionStateResponse {
  status: ConnectionStatus;
  last_run?: string;
}