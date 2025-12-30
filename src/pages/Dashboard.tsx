import React from 'react';
import { ConnectionStatus } from '../header/ConnectionStatus';
import { WorkspaceLayout } from '../workspace/WorkspaceLayout';
/**
 * Dashboard Page
 *
 * Main application page that composes:
 * - Header: Connection status (always visible)
 * - Workspace: Tabbed interface for actions and jobs
 *
 * This is the composition layer that brings together
 * the two main sections of the application.
 */
export function Dashboard() {
  return <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Header Section - Always Visible */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <ConnectionStatus />
      </header>

      {/* Workspace Section - Tabbed Content */}
      <WorkspaceLayout />
    </div>;
}