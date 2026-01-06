import React, { useState } from 'react';
import { ConnectionHeader } from '../connection/header/ConnectionHeader';
import { ConnectionPopUp } from '../connection/popup/ConnectionPopUp';
import { NewActions } from './action_form/shared/NewActions';
import './Dashboard.css';

export function Dashboard() {
    const [isConnectionPopUpOpen, setIsConnectionPopUpOpen] = useState<boolean>(false);

    function closeConnectionPopUp() {
        setIsConnectionPopUpOpen(false);
    }

    function openConnectionPopUp() {
        setIsConnectionPopUpOpen(true);
    }

    return (
        <div style={{ position: 'relative', height: "100%" }}>

            <div id="main-content" className={isConnectionPopUpOpen ? 'fade-out' : ''}>
                <ConnectionHeader openConnectionPopUp={openConnectionPopUp} />

                {/* spacer */}
                <div style={{ height: "var(--spacing-md)" }} />

                {/* 
                    switcher-container
                    selects whether the sharedWorkspace below shows:
                    - New Actions
                    - Current Jobs
                */}
                <div className="switcher-container">
                    <div className="switcher-item unselected">
                        <span>✚</span>
                        <span>New Actions</span>
                    </div>

                    <div className="switcher-item selected">
                        <span>☰</span>
                        <span>Current Jobs</span>
                    </div>
                </div>

                {/* spacer */}
                <div style={{ height: "var(--spacing-lg)" }} />

                {/* 
                    wrapper for shared region
                    provides horizontal padding
                */}
                <div style={{ padding: "0 var(--spacing-xxl)", width: "100%" }}>
                    {/* sharedWorkspace */}
                    <div className="sharedWorkspace">
                        {/* New Actions view */}
                        <NewActions />
                    </div>
                </div>
            </div>

            {/* 
                connection popup
                used for connecting to WhatsApp Web via QR code
            */}
            {isConnectionPopUpOpen && (
                <ConnectionPopUp closeConnectionPopUp={closeConnectionPopUp} />
            )}

        </div>
    );
}
