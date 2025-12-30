import React from 'react';
import { ConnectionStatus } from '../header/ConnectionStatus';
import { WorkspaceLayout } from '../workspace/WorkspaceLayout';
import './Dashboard.css';
export function Dashboard() {
  return <div className="dashboard">
      <header className="dashboard__header">
        <ConnectionStatus />
      </header>
      <WorkspaceLayout />
    </div>;
}