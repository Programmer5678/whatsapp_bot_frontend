import React, { useState } from 'react';
import { NewActions } from './new_actions/NewActions';
import { CurrentJobs } from './current_jobs/CurrentJobs';
import './shared/shared.css';
import './Workspace.css'

export function Workspace() {
    const [switcherItem, setSwitcherItem] = useState<
        'new-actions' | 'current-jobs'
    >('current-jobs');

    return (
        <>
            {/*
              switcher-container
              Selects whether the sharedWorkspace below shows:
              - New Actions
              - Current Jobs
            */}
            <div className="switcher-container">
                <div
                    className={`switcher-item ${
                        switcherItem === 'new-actions'
                            ? 'selected'
                            : 'unselected'
                    }`}
                    onClick={() => setSwitcherItem('new-actions')}
                >
                    <span>✚</span>
                    <span>New Actions</span>
                </div>

                <div
                    className={`switcher-item ${
                        switcherItem === 'current-jobs'
                            ? 'selected'
                            : 'unselected'
                    }`}
                    onClick={() => setSwitcherItem('current-jobs')}
                >
                    <span>☰</span>
                    <span>Current Jobs</span>
                </div>
            </div>

            {/* spacer */}
            <div style={{ height: 'var(--spacing-lg)' }} />

            {/*
              Wrapper for shared region
              Provides horizontal padding
            */}
            <div style={{ padding: '0 var(--spacing-xxl)', width: '100%' }}>
                {/* sharedWorkspace */}
                <div className="sharedWorkspace">
                    {/* New Actions view */}
                    <div
                        style={
                            switcherItem !== 'new-actions'
                                ? { display: 'none' }
                                : {}
                        }
                    >
                        <NewActions />
                    </div>

                    {/* Current Jobs view */}
                    {switcherItem === 'current-jobs' && <CurrentJobs />}
                </div>
            </div>
        </>
    );
}
