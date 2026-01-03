import React from 'react';
import './NewActions.css';

export function NewActions() {
    return (
        <>
            {/* header */}
            <div className="new-actions-header">
                <div className="new-actions-title">
                    Create New Action
                </div>
                <div className="new-actions-subtitle">
                    Select an action type to configure and launch automation.
                </div>
            </div>

            {/* spacer */}
            <div style={{ height: "var(--spacing-lg)" }} />

            {/* action buttons */}
            <div className="new-actions-grid">
                <button className="action-button default" style={{ fontSize : "var(--font-mdl)" }}>Raf0</button>
                <button className="action-button default" style={{ fontSize : "var(--font-mdl)" }}>Mavdak</button>
                <button className="action-button default" style={{ fontSize : "var(--font-mdl)" }}>Hakhana</button>
                <button className="action-button default" style={{ fontSize : "var(--font-mdl)" }}>Veadat Keva</button>
            </div>
        </>
    );
}
